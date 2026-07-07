import { sendEmail } from './services/emailService.js';

const to = process.argv[2] || 'tu-email@dominio.com';
const subject = process.argv[3] || 'Prueba correo profesional Rotulweb';
const text = process.argv[4] || 'Prueba de funcionamiento del correo profesional.';

const result = await sendEmail(to, subject, text);
console.log(JSON.stringify(result, null, 2));
