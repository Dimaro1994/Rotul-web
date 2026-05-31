import dotenv from 'dotenv';
import nodemailer from 'nodemailer';

dotenv.config();

const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST,
  port: process.env.SMTP_PORT,
  secure: false,
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASSWORD,
  },
  tls: {
    rejectUnauthorized: false
  }
});

console.log('🧪 Probando conexión SMTP...');
console.log('Host:', process.env.SMTP_HOST);
console.log('Usuario:', process.env.EMAIL_USER);

transporter.verify((error, success) => {
  if (error) {
    console.log('❌ Error:', error.message);
    process.exit(1);
  } else {
    console.log('✅ Conexión exitosa');
    process.exit(0);
  }
});
