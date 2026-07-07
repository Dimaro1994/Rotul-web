import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import dotenv from 'dotenv';
import whatsappRoutes from './whatsappRoutes.js';
import clientRoutes from './routes/clients.js';
import instagramLeadRoutes from './routes/instagramLeads.js';
import { connectDB } from './config/database.js';
import { setupEscalationAgentAPI } from './escalationAgent.js';
import { setupSearchAgentAPI } from './searchAgent.js';
import { getBackendPort } from './config/agentConfig.js';

dotenv.config();

const app = express();
const PORT = getBackendPort();

// Middleware
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Conectar MongoDB
connectDB();

// Setup Escalation Agent API
setupEscalationAgentAPI(app);
setupSearchAgentAPI(app);

// Routes
app.use('/api/whatsapp', whatsappRoutes);
app.use('/api/instagram-leads', instagramLeadRoutes);
app.use('/api', clientRoutes);

// Health check
app.get('/health', (req, res) => {
  res.json({ status: 'OK', message: 'Rotulweb API running' });
});

// Start server
app.listen(PORT, () => {
  console.log(`✅ Server running on http://localhost:${PORT}`);
});
