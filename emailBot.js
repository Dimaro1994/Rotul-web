import dotenv from 'dotenv';
import nodemailer from 'nodemailer';
import Imap from 'imap';
import { simpleParser } from 'mailparser';
import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';
import Email from './models/Email.js';
import { generateSmartReply, categorizeMail } from './services/emailAI.js';
import { notifyNewEmail } from './services/whatsappNotifier.js';
import { connectDB } from './config/database.js';

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

// Conectar a MongoDB (opcional)
try {
  await connectDB();
} catch (error) {
  console.warn('⚠️ MongoDB no disponible. El bot funcionará sin persistencia en BD.');
}

// Configuración SMTP
const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST,
  port: process.env.SMTP_PORT,
  secure: false,
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASSWORD,
  },
  tls: {
    rejectUnauthorized: false,
  },
});

// Configuración IMAP
const imap = new Imap({
  user: process.env.EMAIL_USER,
  password: process.env.EMAIL_PASSWORD,
  host: process.env.EMAIL_HOST,
  port: process.env.EMAIL_PORT,
  tls: true,
});

// Enviar correo
async function sendEmail(to, subject, text, html = null) {
  try {
    const info = await transporter.sendMail({
      from: process.env.EMAIL_USER,
      to: to,
      subject: subject,
      text: text,
      html: html || text,
    });
    console.log('✉️ Correo enviado a:', to);
    return { success: true, messageId: info.messageId };
  } catch (error) {
    console.error('❌ Error SMTP:', error.message);
    return { success: false, error: error.message };
  }
}

// Procesar correo recibido
function processEmail(msg) {
  simpleParser(msg, async (err, parsed) => {
    if (err) {
      console.error('Error parseando:', err);
      return;
    }

    try {
      const emailData = {
        from: parsed.from.text,
        to: process.env.EMAIL_USER,
        subject: parsed.subject || '(sin asunto)',
        text: parsed.text || '',
        html: parsed.html || '',
      };

      // No responder a auto-replies
      if (
        parsed.headers.get('x-auto-response-suppress') ||
        emailData.subject.toLowerCase().includes('auto-reply')
      ) {
        console.log('⏭️ Ignorando auto-reply');
        return;
      }

      // Guardar en MongoDB (si está disponible)
      let dbEmail = null;
      try {
        dbEmail = new Email({
          ...emailData,
          processed: false,
        });
        await dbEmail.save();
        console.log('📧 Email guardado en BD:', emailData.from);
      } catch (dbError) {
        console.warn('⚠️ No se pudo guardar en BD:', dbError.message);
        dbEmail = emailData; // Usar objeto simple como fallback
      }

      // Categorizar
      const category = await categorizeMail(emailData);
      dbEmail.category = category;

      // Generar respuesta IA
      console.log('🤖 Generando respuesta IA...');
      const aiResult = await generateSmartReply(emailData);

      let responseText = aiResult.response;
      if (!aiResult.success) {
        console.log('⚠️ IA falló, usando respuesta genérica');
        responseText = `Hemos recibido tu correo: "${emailData.subject}". Nos pondremos en contacto pronto.\n\nWhatsApp: +34 633 833 407`;
      }

      // Enviar respuesta
      const sendResult = await sendEmail(
        emailData.from,
        `Re: ${emailData.subject}`,
        responseText
      );

      // Actualizar estado (si tenemos objeto BD)
      if (dbEmail && dbEmail.save) {
        if (sendResult.success) {
          dbEmail.responseStatus = 'sent';
          dbEmail.aiResponse = responseText;
          dbEmail.processed = true;
        } else {
          dbEmail.responseStatus = 'failed';
          dbEmail.responseError = sendResult.error;
        }
        try {
          await dbEmail.save();
        } catch (saveError) {
          console.warn('No se pudo actualizar BD:', saveError.message);
        }
      }

      // Notificar por WhatsApp
      await notifyNewEmail(dbEmail);
    } catch (error) {
      console.error('❌ Error procesando email:', error.message);
    }
  });
}

// Abrir bandeja
function openInbox() {
  imap.openBox('INBOX', false, (err) => {
    if (err) {
      console.error('Error abriendo bandeja:', err);
      return;
    }

    imap.search(['UNSEEN'], (err, results) => {
      if (err) {
        console.error('Error buscando:', err);
        return;
      }

      if (results.length === 0) {
        console.log('📭 No hay correos nuevos');
        return;
      }

      console.log(`📬 ${results.length} correos nuevos`);
      const f = imap.fetch(results, { bodies: '' });
      f.on('message', processEmail);
    });
  });
}

// APIs
app.post('/api/send-email', async (req, res) => {
  const { to, subject, text, html } = req.body;

  if (!to || !subject || !text) {
    return res.status(400).json({ error: 'Faltan campos requeridos' });
  }

  const result = await sendEmail(to, subject, text, html);
  res.json(result);
});

app.get('/api/emails', async (req, res) => {
  try {
    const emails = await Email.find({ archived: false })
      .sort({ timestamp: -1 })
      .limit(50);
    res.json(emails);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.get('/api/emails/stats/summary', async (req, res) => {
  try {
    const total = await Email.countDocuments({ archived: false });
    const processed = await Email.countDocuments({
      archived: false,
      processed: true,
    });
    const responded = await Email.countDocuments({
      archived: false,
      responseStatus: 'sent',
    });

    res.json({
      total,
      processed,
      responded,
      pending: total - processed,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.delete('/api/emails', async (req, res) => {
  try {
    await Email.updateMany({ archived: false }, { archived: true });
    res.json({ message: 'Todos los emails archivados' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Servidor HTTP
const PORT = process.env.BOT_PORT || 3001;
app.listen(PORT, () => {
  console.log(`\n🚀 Bot escuchando en puerto ${PORT}`);
  console.log('📧 Conectando a IMAP...\n');
});

// IMAP
imap.on('ready', () => {
  console.log('✅ IMAP conectado');
  openInbox();
});

imap.on('mail', () => {
  console.log('📬 Revisando nuevos correos...');
  openInbox();
});

imap.on('error', (err) => {
  console.error('❌ Error IMAP:', err.message);
});

imap.on('end', () => {
  console.log('Conexión IMAP cerrada');
});

imap.connect();

export { sendEmail };
