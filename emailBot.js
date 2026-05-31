import dotenv from 'dotenv';
import nodemailer from 'nodemailer';
import Imap from 'imap';
import { simpleParser } from 'mailparser';
import express from 'express';
import cors from 'cors';
import { setupSearchAgentAPI } from './searchAgent.js';

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

// Configuración SMTP
const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST,
  port: process.env.SMTP_PORT,
  secure: false,
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASSWORD,
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

let receivedEmails = [];

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

// Respuesta automática
async function sendAutoReply(from, subject) {
  const replySubject = subject.startsWith('Re:') ? subject : `Re: ${subject}`;
  const replyText = `Hola,

Gracias por tu correo. He recibido tu mensaje correctamente.

Nos pondremos en contacto contigo pronto.

Saludos,
Bot de Rotulweb`;

  await sendEmail(from, replySubject, replyText);
}

// Procesar correo recibido
function processEmail(msg) {
  simpleParser(msg, async (err, parsed) => {
    if (err) return;

    const emailData = {
      from: parsed.from.text,
      subject: parsed.subject,
      text: parsed.text,
      timestamp: new Date(),
    };

    receivedEmails.push(emailData);
    console.log('📨 Correo recibido de:', emailData.from);

    // RESPUESTA AUTOMÁTICA
    await sendAutoReply(emailData.from, emailData.subject);
  });
}

// Abrir bandeja
function openInbox() {
  imap.openBox('INBOX', false, (err, box) => {
    if (err) return;

    imap.search(['UNSEEN'], (err, results) => {
      if (err) return;
      if (results.length === 0) return;

      const f = imap.fetch(results, { bodies: '' });
      f.on('message', processEmail);
    });
  });
}

// APIs
app.post('/api/send-email', async (req, res) => {
  const { to, subject, text, html } = req.body;
  if (!to || !subject || !text) {
    return res.status(400).json({ error: 'Faltan campos' });
  }
  const result = await sendEmail(to, subject, text, html);
  res.json(result);
});

app.get('/api/emails', (req, res) => {
  res.json(receivedEmails);
});

app.delete('/api/emails', (req, res) => {
  receivedEmails = [];
  res.json({ message: 'Correos eliminados' });
});

// Integrar Search Agent API
await setupSearchAgentAPI(app);

// Servidor HTTP
const PORT = process.env.BOT_PORT || 3001;
const server = app.listen(PORT, async () => {
  console.log(`\n🚀 Bot escuchando en puerto ${PORT}\n`);
  console.log('✅ Search Agent API inicializado\n');
});

// Conectar IMAP
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

imap.connect();

export { sendEmail };
