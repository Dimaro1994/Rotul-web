import readline from 'readline';
import fs from 'fs';
import nodemailer from 'nodemailer';
import Imap from 'imap';

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

function question(query) {
  return new Promise((resolve) => rl.question(query, resolve));
}

async function setup() {
  console.log('\n🤖 Email Bot - Setup Interactivo\n');

  const email = await question('📧 Email (info@rotulweb): ');
  const password = await question('🔑 Contraseña de aplicación (16 caracteres): ');

  console.log('\n⏳ Probando conexión...\n');

  const transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 587,
    secure: false,
    auth: {
      user: email,
      pass: password,
    },
  });

  transporter.verify((error, success) => {
    if (error) {
      console.log('❌ Error SMTP:', error.message);
      console.log('\n⚠️  Verifica:');
      console.log('1. Email correcto: ' + email);
      console.log('2. Contraseña sin espacios');
      console.log('3. 2FA habilitado en Google');
      console.log('4. Contraseña de aplicación generada correctamente\n');
      rl.close();
      return;
    }

    console.log('✅ SMTP conectado\n');

    const imap = new Imap({
      user: email,
      password: password,
      host: 'imap.gmail.com',
      port: 993,
      tls: true,
    });

    imap.on('ready', () => {
      console.log('✅ IMAP conectado\n');

      // Guardar configuración
      const envContent = `EMAIL_USER=${email}
EMAIL_PASSWORD=${password}
EMAIL_HOST=imap.gmail.com
EMAIL_PORT=993
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_SECURE=false
BOT_PORT=3001
`;

      fs.writeFileSync('.env', envContent);
      console.log('✅ .env actualizado\n');
      console.log('🎉 ¡TODO LISTO! Ahora ejecuta:\n');
      console.log('   npm run email-bot\n');

      imap.end();
      rl.close();
    });

    imap.on('error', (err) => {
      console.log('❌ Error IMAP:', err.message);
      rl.close();
    });

    imap.connect();
  });
}

setup();
