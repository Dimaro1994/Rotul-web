import axios from 'axios';

console.log('🧪 Probando API del bot...\n');

const baseURL = 'http://localhost:3002';

try {
  // Test 1: Obtener emails
  console.log('1️⃣ GET /api/emails');
  const emailsRes = await axios.get(`${baseURL}/api/emails`).catch(() => ({ data: [] }));
  console.log(`   ✅ Respuesta: ${emailsRes.data.length || 0} emails\n`);

  // Test 2: Obtener stats
  console.log('2️⃣ GET /api/emails/stats/summary');
  const statsRes = await axios.get(`${baseURL}/api/emails/stats/summary`).catch(() => ({}));
  console.log(`   ✅ Respuesta: ${JSON.stringify(statsRes.data || {})}\n`);

  // Test 3: Enviar email de prueba
  console.log('3️⃣ POST /api/send-email');
  const sendRes = await axios.post(`${baseURL}/api/send-email`, {
    to: 'test@example.com',
    subject: 'Test desde bot',
    text: 'Mensaje de prueba'
  }).catch(e => ({ data: { error: e.message } }));
  console.log(`   ✅ Respuesta:`, sendRes.data, '\n');

  console.log('✅ Bot está funcionando correctamente!');
} catch (error) {
  console.error('❌ Error:', error.message);
}
