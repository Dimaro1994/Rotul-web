import axios from 'axios';

const WHATSAPP_API_URL = 'https://graph.instagram.com/v18.0';
const accessToken = process.env.WHATSAPP_ACCESS_TOKEN;
const phoneNumberId = process.env.WHATSAPP_PHONE_NUMBER_ID;
const userPhone = process.env.WHATSAPP_USER_PHONE;

export async function notifyNewEmail(email) {
  if (!accessToken || !phoneNumberId || !userPhone) {
    console.warn('⚠️ WhatsApp no configurado. Saltando notificación.');
    return { success: false, reason: 'WhatsApp not configured' };
  }

  try {
    const message = `📧 Nuevo correo recibido\n\nDe: ${email.from}\nAsunto: ${email.subject}\n\nRespuesta automática enviada. Consulta el dashboard para más detalles.`;

    const response = await axios.post(
      `${WHATSAPP_API_URL}/${phoneNumberId}/messages`,
      {
        messaging_product: 'whatsapp',
        recipient_type: 'individual',
        to: userPhone.replace(/\D/g, ''),
        type: 'text',
        text: {
          body: message,
        },
      },
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      }
    );

    console.log('✅ Notificación WhatsApp enviada');
    return { success: true, messageId: response.data.messages[0].id };
  } catch (error) {
    console.error('❌ Error notificando WhatsApp:', error.response?.data || error.message);
    return { success: false, error: error.message };
  }
}
