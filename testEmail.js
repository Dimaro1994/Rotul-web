import dotenv from 'dotenv';
import nodemailer from 'nodemailer';
import Imap from 'imap';

dotenv.config();

console.log('🧪 Probando conexión de correo...\n');

// Test SMTP
console.log('📤 Probando SMTP...');
const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST,
  port: process.env.SMTP_PORT,
  secure: false,
  requireTLS: true,
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASSWORD,
  },
});

transporter.verify((error, success) => {
  if (error) {
    console.log('❌ SMTP ERROR:', error.message);
  } else {
    console.log('✅ SMTP OK - Conexión exitosa\n');
  }

  // Test IMAP
  console.log('📥 Probando IMAP...');
  const imap = new Imap({
    user: process.env.EMAIL_USER,
    password: process.env.EMAIL_PASSWORD,
    host: process.env.EMAIL_HOST,
    port: process.env.EMAIL_PORT,
    tls: true,
  });

  imap.on('ready', () => {
    console.log('✅ IMAP OK - Conexión exitosa\n');
    imap.end();
    process.exit(0);
  });

  imap.on('error', (err) => {
    console.log('❌ IMAP ERROR:', err.message);
    console.log('\n⚠️  Verifica:');
    console.log('1. Email correcto: ' + process.env.EMAIL_USER);
    console.log('2. Contraseña sin espacios ni caracteres especiales');
    console.log('3. Host correcto: ' + process.env.EMAIL_HOST);
    console.log('4. Puerto correcto: ' + process.env.EMAIL_PORT + '\n');
    process.exit(1);
  });

  imap.connect();
});
