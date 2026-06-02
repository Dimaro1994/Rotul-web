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
  console.log('ℹ️  Para Roundcube (Disbit) usa:\n');
  console.log('   SMTP Host: blue.disbit.com');
  console.log('   SMTP Puerto: 587');
  console.log('   IMAP Host: blue.disbit.com');
  console.log('   IMAP Puerto: 993\n');

  const email = await question('📧 Email: ');
  const password = await question('🔑 Contraseña: ');
  const smtpHost = await question('📤 SMTP Host [blue.disbit.com]: ') || 'blue.disbit.com';
  const smtpPort = await question('📤 SMTP Puerto [587]: ') || '587';
  const imapHost = await question('📥 IMAP Host [blue.disbit.com]: ') || 'blue.disbit.com';
  const imapPort = await question('📥 IMAP Puerto [993]: ') || '993';

  console.log('\n⏳ Probando conexión...\n');

  const transporter = nodemailer.createTransport({
    host: smtpHost,
    port: parseInt(smtpPort),
    secure: false,
    requireTLS: true,
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
      console.log('3. Host y puerto correctos\n');
      rl.close();
      return;
    }

    console.log('✅ SMTP conectado\n');

    const imap = new Imap({
      user: email,
      password: password,
      host: imapHost,
      port: parseInt(imapPort),
      tls: true,
    });

    imap.on('ready', () => {
      console.log('✅ IMAP conectado\n');

      // Guardar configuración
      const envContent = `EMAIL_USER=${email}
EMAIL_PASSWORD=${password}
EMAIL_HOST=${imapHost}
EMAIL_PORT=${imapPort}
SMTP_HOST=${smtpHost}
SMTP_PORT=${smtpPort}
SMTP_SECURE=false
BOT_PORT=3001
`;

      fs.writeFileSync('.env', envContent);
      console.log('✅ .env actualizado correctamente\n');
      console.log('🎉 ¡TODO LISTO! Ahora puedes ejecutar:\n');
      console.log('   npm run email-bot\n');

      imap.end();
      rl.close();
    });

    imap.on('error', (err) => {
      console.log('❌ Error IMAP:', err.message);
      console.log('\n⚠️  Verifica:');
      console.log('1. Email correcto: ' + email);
      console.log('2. Contraseña sin espacios');
      console.log('3. Host y puerto correctos\n');
      rl.close();
    });

    imap.connect();
  });
}

setup();
