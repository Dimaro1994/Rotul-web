import nodemailer from 'nodemailer';
import dotenv from 'dotenv';
dotenv.config();

const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST,
  port: process.env.SMTP_PORT,
  secure: false,
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASSWORD,
  },
  tls: { rejectUnauthorized: false }
});

console.log('🧪 Probando SMTP...\n');
transporter.verify((error, success) => {
  if (error) {
    console.log('❌ Error:', error.message);
  } else {
    console.log('✅ SMTP conectado correctamente!\n');
    console.log('📧 Puedes enviar correos desde:', process.env.EMAIL_USER);
  }
  process.exit(error ? 1 : 0);
});
