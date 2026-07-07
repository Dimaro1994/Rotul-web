import nodemailer from 'nodemailer';
import dotenv from 'dotenv';
dotenv.config();

const configs = [
  { host: 'blue.disbit.com', port: 587, name: 'blue.disbit:587' },
  { host: 'blue.disbit.com', port: 465, name: 'blue.disbit:465' },
  { host: 'mail.disbit.com', port: 587, name: 'mail.disbit:587' },
  { host: 'mail.disbit.com', port: 465, name: 'mail.disbit:465' },
  { host: 'smtp.disbit.com', port: 587, name: 'smtp.disbit:587' },
];

async function testConfig(config) {
  return new Promise((resolve) => {
    const transporter = nodemailer.createTransport({
      host: config.host,
      port: config.port,
      secure: config.port === 465,
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASSWORD,
      },
      tls: { rejectUnauthorized: false }
    });

    transporter.verify((error) => {
      if (error) {
        resolve(`❌ ${config.name}: ${error.message}`);
      } else {
        resolve(`✅ ${config.name}: FUNCIONA`);
      }
    });
  });
}

console.log('🧪 Probando servidores...\n');
for (const config of configs) {
  const result = await testConfig(config);
  console.log(result);
}
