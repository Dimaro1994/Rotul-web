// Controladores para WhatsApp
import axios from 'axios';

const WHATSAPP_API_URL = 'https://graph.instagram.com/v18.0';

/**
 * Enviar mensaje a través de WhatsApp
 */
export const sendMessage = async (req, res) => {
  try {
    const { phone_number, message_text } = req.body;

    if (!phone_number || !message_text) {
      return res.status(400).json({ error: 'phone_number y message_text son requeridos' });
    }

    const response = await axios.post(
      `${WHATSAPP_API_URL}/${process.env.WHATSAPP_PHONE_NUMBER_ID}/messages`,
      {
        messaging_product: 'whatsapp',
        to: phone_number,
        type: 'text',
        text: { body: message_text },
      },
      {
        headers: {
          Authorization: `Bearer ${process.env.WHATSAPP_ACCESS_TOKEN}`,
          'Content-Type': 'application/json',
        },
      }
    );

    console.log('✅ Mensaje enviado:', response.data);
    res.json({ success: true, message_id: response.data.messages[0].id });
  } catch (error) {
    console.error('❌ Error enviando mensaje:', error.response?.data || error.message);
    res.status(500).json({ error: error.response?.data || error.message });
  }
};

/**
 * Recibir y procesar mensajes de WhatsApp
 */
export const receiveMessage = async (req, res) => {
  try {
    const { entry } = req.body;

    if (!entry || !entry[0].changes) {
      return res.sendStatus(200);
    }

    const changes = entry[0].changes[0];
    const { value } = changes;

    if (value.messages) {
      const message = value.messages[0];
      const sender = value.contacts[0];

      console.log(`📨 Mensaje recibido de ${sender.wa_id}: ${message.text?.body || '[archivo]'}`);

      // Aquí iría la lógica para:
      // 1. Guardar en base de datos
      // 2. Procesar automáticamente
      // 3. Notificar al agente
    }

    res.sendStatus(200);
  } catch (error) {
    console.error('❌ Error procesando webhook:', error);
    res.sendStatus(500);
  }
};

/**
 * Obtener estado de mensajes
 */
export const getMessageStatus = async (req, res) => {
  try {
    const { message_id } = req.params;

    // Implementar: obtener estado del mensaje desde WhatsApp API
    res.json({ status: 'pending', message_id });
  } catch (error) {
    console.error('❌ Error obteniendo estado:', error);
    res.status(500).json({ error: error.message });
  }
};
