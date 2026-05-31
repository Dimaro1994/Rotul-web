import dotenv from 'dotenv';
import axios from 'axios';
import { sendEmail } from './emailBot.js';
import fs from 'fs';

dotenv.config();

const LEADS_FILE = './leads.json';
const ESCALATION_FILE = './escalation_logs.json';

// Cargar logs de escalonamiento
function loadEscalationLogs() {
  if (fs.existsSync(ESCALATION_FILE)) {
    return JSON.parse(fs.readFileSync(ESCALATION_FILE, 'utf8'));
  }
  return [];
}

// Guardar logs
function saveEscalationLogs(logs) {
  fs.writeFileSync(ESCALATION_FILE, JSON.stringify(logs, null, 2));
}

// Cargar leads
function loadLeads() {
  if (fs.existsSync(LEADS_FILE)) {
    return JSON.parse(fs.readFileSync(LEADS_FILE, 'utf8'));
  }
  return [];
}

// Guardar leads
function saveLeads(leads) {
  fs.writeFileSync(LEADS_FILE, JSON.stringify(leads, null, 2));
}

// Detectar si un cliente está confuso/inactivo
function isClientConfused(lead) {
  const now = new Date();
  const contactedAt = new Date(lead.contacted_at);
  const hoursSinceContact = (now - contactedAt) / (1000 * 60 * 60);

  // Si pasaron más de 24 horas sin respuesta, está confuso
  return hoursSinceContact > 24 && !lead.responded;
}

// Generar enlace de WhatsApp
function generateWhatsAppLink(clientPhone = null) {
  const phone = clientPhone || process.env.BUSINESS_PHONE || '34611223344';
  const message = encodeURIComponent(
    '¡Hola! Vi tu interés en nuestro servicio. Me gustaría ayudarte directamente. ¿Tienes un momento para hablar?'
  );
  return `https://wa.me/${phone}?text=${message}`;
}

// Generar botones de contacto en HTML
function generateContactButtons(clientEmail, clientPhone = null) {
  const whatsappLink = generateWhatsAppLink(clientPhone);

  return `
    <div style="margin: 20px 0; text-align: center;">
      <p style="font-size: 16px; color: #333; margin-bottom: 15px;">
        <strong>¿Prefieres hablar directamente?</strong>
      </p>

      <table style="width: 100%; max-width: 500px; margin: 0 auto;">
        <tr>
          <td style="padding: 10px;">
            <a href="${whatsappLink}" style="
              display: inline-block;
              background-color: #25D366;
              color: white;
              padding: 12px 20px;
              text-decoration: none;
              border-radius: 5px;
              font-weight: bold;
              width: 100%;
              box-sizing: border-box;
              text-align: center;
            ">
              💬 Contactar por WhatsApp
            </a>
          </td>
        </tr>
        <tr>
          <td style="padding: 10px;">
            <a href="tel:${process.env.BUSINESS_PHONE || '34611223344'}" style="
              display: inline-block;
              background-color: #007AFF;
              color: white;
              padding: 12px 20px;
              text-decoration: none;
              border-radius: 5px;
              font-weight: bold;
              width: 100%;
              box-sizing: border-box;
              text-align: center;
            ">
              📞 Llamada Directa
            </a>
          </td>
        </tr>
      </table>
    </div>
  `;
}

// Enviar email de escalonamiento
async function sendEscalationEmail(lead, reason) {
  const email = lead.emails[0];
  if (!email) return false;

  const subject = `🚀 Solución rápida para ${lead.company} - Llamada o WhatsApp`;
  const html = `
    <h2>¡Hola ${lead.company}! 👋</h2>

    <p>Hemos visto que tienes interés en nuestros servicios de <strong>sitios web profesionales</strong>.</p>

    <p>Entendemos que a veces los emails no son suficientes para resolver todas tus dudas.</p>

    <h3>✨ Por eso te ofrecemos estas opciones:</h3>

    ${generateContactButtons(email, lead.phone)}

    <hr style="margin: 30px 0; border: none; border-top: 1px solid #ddd;">

    <h3>¿Qué podemos hacer por ti?</h3>
    <ul>
      <li>🌐 Sitios web modernos y personalizados</li>
      <li>📱 Completamente optimizado para móviles</li>
      <li>🔍 SEO integrado para mejorar tu visibilidad</li>
      <li>💰 Presupuesto sin compromiso</li>
      <li>⚡ Implementación rápida y profesional</li>
    </ul>

    <p style="margin-top: 20px; color: #666;">
      <em>Responderemos en menos de 2 horas durante horario laboral</em>
    </p>

    <hr style="margin: 30px 0; border: none; border-top: 1px solid #ddd;">
    <p style="font-size: 12px; color: #999;">
      <em>Equipo Rotulweb - Transformamos tu presencia online</em>
    </p>
  `;

  const result = await sendEmail(email, subject, '', html);

  if (result.success) {
    const logs = loadEscalationLogs();
    logs.push({
      leadId: lead.company,
      email: email,
      reason: reason,
      sentAt: new Date().toISOString(),
      type: 'email_escalation',
    });
    saveEscalationLogs(logs);

    lead.escalation_sent = true;
    lead.escalation_sent_at = new Date().toISOString();
    saveLeads(loadLeads().map(l => l.company === lead.company ? lead : l));

    console.log(`🚀 Email de escalonamiento enviado a: ${email}`);
    return true;
  }

  return false;
}

// Detectar y escalar leads confusos
async function escalateConfusedLeads() {
  const leads = loadLeads();
  let escalated = 0;

  console.log(`\n🔍 Analizando ${leads.length} leads para escalonamiento...\n`);

  for (const lead of leads) {
    // Solo escalar si:
    // 1. Fue contactado
    // 2. No tiene respuesta
    // 3. No ha sido escalado aún
    if (lead.contacted && !lead.responded && !lead.escalation_sent) {
      if (isClientConfused(lead)) {
        console.log(`⚠️ Cliente confuso detectado: ${lead.company}`);
        const success = await sendEscalationEmail(lead, 'inactivity_24h');
        if (success) escalated++;
        await new Promise(resolve => setTimeout(resolve, 1500));
      }
    }
  }

  console.log(`\n✅ ${escalated} leads escalados exitosamente\n`);
  return escalated;
}

// Monitorear respuestas en email
async function checkForResponses() {
  const leads = loadLeads();
  let responses = 0;

  console.log(`\n📧 Verificando respuestas de email...\n`);

  for (const lead of leads) {
    // Aquí puedes agregar lógica para verificar respuestas via IMAP
    // Por ahora es placeholder
    console.log(`✓ Revisando: ${lead.company}`);
  }

  return responses;
}

// Obtener estadísticas de escalonamiento
function getEscalationStats() {
  const leads = loadLeads();
  const logs = loadEscalationLogs();

  const stats = {
    total_leads: leads.length,
    contacted: leads.filter(l => l.contacted).length,
    responded: leads.filter(l => l.responded).length,
    confused: leads.filter(l => l.contacted && !l.responded && !l.escalation_sent).length,
    escalated: leads.filter(l => l.escalation_sent).length,
    total_escalation_logs: logs.length,
    recent_escalations: logs.slice(-5).reverse(),
  };

  return stats;
}

// Setup API routes
export async function setupEscalationAgentAPI(app) {
  // Escalar leads confusos manualmente
  app.post('/api/escalate-leads', async (req, res) => {
    const escalated = await escalateConfusedLeads();
    res.json({
      success: true,
      message: `${escalated} leads escalados`,
      escalated,
    });
  });

  // Obtener estadísticas
  app.get('/api/escalation-stats', (req, res) => {
    const stats = getEscalationStats();
    res.json(stats);
  });

  // Obtener logs de escalonamiento
  app.get('/api/escalation-logs', (req, res) => {
    const logs = loadEscalationLogs();
    res.json(logs);
  });

  // Escalar un lead específico
  app.post('/api/escalate-lead/:company', async (req, res) => {
    const leads = loadLeads();
    const lead = leads.find(l => l.company === req.params.company);

    if (!lead) {
      return res.status(404).json({ error: 'Lead no encontrado' });
    }

    const success = await sendEscalationEmail(lead, 'manual_escalation');
    res.json({ success, message: success ? 'Lead escalado' : 'Error al escalar' });
  });

  // Marcar lead como respondido
  app.put('/api/lead-responded/:company', (req, res) => {
    const leads = loadLeads();
    const lead = leads.find(l => l.company === req.params.company);

    if (!lead) {
      return res.status(404).json({ error: 'Lead no encontrado' });
    }

    lead.responded = true;
    lead.responded_at = new Date().toISOString();
    saveLeads(leads);

    const logs = loadEscalationLogs();
    logs.push({
      leadId: lead.company,
      event: 'client_responded',
      timestamp: new Date().toISOString(),
    });
    saveEscalationLogs(logs);

    res.json({ success: true, message: 'Lead marcado como respondido' });
  });
}

// Exportar funciones
export {
  escalateConfusedLeads,
  checkForResponses,
  getEscalationStats,
  loadLeads,
  saveLeads,
};
