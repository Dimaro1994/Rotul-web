import dotenv from 'dotenv';
import nodemailer from 'nodemailer';

dotenv.config();

function getSmtpConfig() {
  const port = Number(process.env.SMTP_PORT || 587);
  const secure = process.env.SMTP_SECURE === 'true' || port === 465;
  const requireTLS = process.env.SMTP_REQUIRE_TLS !== 'false' && (!secure && port === 587);

  return {
    host: process.env.SMTP_HOST,
    port,
    secure,
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASSWORD,
    },
    tls: {
      rejectUnauthorized: false,
    },
    requireTLS,
  };
}

export function createEmailTransporter() {
  return nodemailer.createTransport(getSmtpConfig());
}

export async function sendEmail(to, subject, text, html = null) {
  try {
    if (!process.env.EMAIL_USER || !process.env.EMAIL_PASSWORD || !process.env.SMTP_HOST) {
      throw new Error('Faltan credenciales SMTP en el archivo .env');
    }

    const transporter = createEmailTransporter();
    const info = await transporter.sendMail({
      from: process.env.EMAIL_USER,
      to,
      subject,
      text,
      html: html || text,
    });

    console.log('Email enviado a:', to);
    return { success: true, messageId: info.messageId };
  } catch (error) {
    const message = error?.response?.body || error?.message || 'Error desconocido';
    console.error('Error SMTP:', message);
    return { success: false, error: message };
  }
}
