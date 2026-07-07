import dotenv from 'dotenv';
import { createEmailTransporter } from './services/emailService.js';
dotenv.config();

const transporter = createEmailTransporter();

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
