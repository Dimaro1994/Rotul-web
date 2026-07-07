import readline from 'readline';
import fs from 'fs';
import nodemailer from 'nodemailer';
import Imap from 'imap';

const SMTP_HOST = 'blue.disbit.com';
const SMTP_PORT = 587;
const EMAIL_HOST = 'blue.disbit.com';
const EMAIL_PORT = 993;

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

function question(query) {
  return new Promise((resolve) => rl.question(query, resolve));
}

function verifySmtp(email, password) {
  const transporter = nodemailer.createTransport({
    host: SMTP_HOST,
    port: SMTP_PORT,
    secure: false,
    requireTLS: true,
    auth: {
      user: email,
      pass: password,
    },
    tls: {
      rejectUnauthorized: false,
    },
  });

  return transporter.verify();
}

function verifyImap(email, password) {
  return new Promise((resolve, reject) => {
    const imap = new Imap({
      user: email,
      password,
      host: EMAIL_HOST,
      port: EMAIL_PORT,
      tls: true,
    });

    imap.once('ready', () => {
      imap.end();
      resolve();
    });
    imap.once('error', reject);
    imap.connect();
  });
}

function upsertEnv(content, updates) {
  const lines = content ? content.split(/\r?\n/) : [];
  const seen = new Set();

  const nextLines = lines.map((line) => {
    const match = line.match(/^([A-Za-z_][A-Za-z0-9_]*)=/);
    if (!match) return line;

    const key = match[1];
    if (!Object.prototype.hasOwnProperty.call(updates, key)) return line;

    seen.add(key);
    return `${key}=${updates[key]}`;
  });

  for (const [key, value] of Object.entries(updates)) {
    if (!seen.has(key)) {
      nextLines.push(`${key}=${value}`);
    }
  }

  return `${nextLines.filter((line, index, all) => line !== '' || index < all.length - 1).join('\n')}\n`;
}

async function setup() {
  console.log('\nEmail Bot - Setup Disbit\n');

  const email = await question('Email (info@rotulweb.com): ');
  const password = await question('Contrasena del buzon Disbit: ');

  console.log('\nProbando SMTP e IMAP...\n');

  try {
    await verifySmtp(email, password);
    console.log('SMTP conectado');

    await verifyImap(email, password);
    console.log('IMAP conectado');

    const currentEnv = fs.existsSync('.env') ? fs.readFileSync('.env', 'utf8') : '';
    const envContent = upsertEnv(currentEnv, {
      EMAIL_USER: email,
      EMAIL_PASSWORD: password,
      EMAIL_HOST,
      EMAIL_PORT,
      SMTP_HOST,
      SMTP_PORT,
      SMTP_SECURE: 'false',
      BOT_PORT: '3002',
    });

    fs.writeFileSync('.env', envContent);
    console.log('\n.env actualizado');
    console.log('Todo listo. Ejecuta: npm run email-bot\n');
  } catch (error) {
    console.log('Error de conexion:', error.message);
    console.log('\nVerifica que el email y la contrasena sean los del buzon Disbit, sin espacios.');
  } finally {
    rl.close();
  }
}

setup();
