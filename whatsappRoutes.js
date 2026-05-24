// Rutas para WhatsApp
import express from 'express';
import crypto from 'crypto';
import { sendMessage, receiveMessage } from '../whatsappController.js';

const router = express.Router();

// Middleware para validar webhook de WhatsApp
const validateWebhook = (req, res, next) => {
  const signature = req.headers['x-hub-signature-256'];

  if (!signature) {
    return res.sendStatus(403);
  }

  const payload = JSON.stringify(req.body);
  const hash = `sha256=${crypto
    .createHmac('sha256', process.env.WHATSAPP_ACCESS_TOKEN)
    .update(payload)
    .digest('hex')}`;

  if (signature === hash) {
    next();
  } else {
    console.log('❌ Invalid webhook signature');
    res.sendStatus(403);
  }
};

// Webhook verification endpoint (GET)
router.get('/webhook', (req, res) => {
  const mode = req.query['hub.mode'];
  const token = req.query['hub.verify_token'];
  const challenge = req.query['hub.challenge'];

  if (mode === 'subscribe' && token === process.env.WHATSAPP_WEBHOOK_VERIFY_TOKEN) {
    console.log('✅ Webhook verified');
    res.status(200).send(challenge);
  } else {
    console.log('❌ Webhook verification failed');
    res.sendStatus(403);
  }
});

// Webhook receiver endpoint (POST)
router.post('/webhook', validateWebhook, receiveMessage);

// Send message endpoint
router.post('/send', sendMessage);

// Get conversation history
router.get('/conversations/:chatId', (req, res) => {
  res.json({ message: 'Not implemented yet' });
});

export default router;
