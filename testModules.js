import dotenv from 'dotenv';
dotenv.config();

console.log('🧪 Verificando módulos...\n');

try {
  console.log('✅ dotenv');
  import('nodemailer').then(() => console.log('✅ nodemailer'));
  import('imap').then(() => console.log('✅ imap'));
  import('mailparser').then(() => console.log('✅ mailparser'));
  import('express').then(() => console.log('✅ express'));
  import('@anthropic-ai/sdk').then(() => console.log('✅ @anthropic-ai/sdk'));
  import('mongoose').then(() => console.log('✅ mongoose'));
  
  setTimeout(() => {
    console.log('\n📧 EMAIL CONFIG:');
    console.log('EMAIL_USER:', process.env.EMAIL_USER);
    console.log('SMTP_HOST:', process.env.SMTP_HOST);
    console.log('BOT_PORT:', process.env.BOT_PORT);
    console.log('\n✅ Todo parece estar bien!');
    process.exit(0);
  }, 1000);
} catch (error) {
  console.error('❌ Error:', error.message);
  process.exit(1);
}
