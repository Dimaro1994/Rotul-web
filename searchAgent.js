import dotenv from 'dotenv';
import axios from 'axios';
import { sendEmail } from './services/emailService.js';
import fs from 'fs';

dotenv.config();

const LEADS_FILE = './leads.json';
const PROCESSED_FILE = './processed_leads.json';

// Cargar leads anteriores
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

// Buscar contactos con Google Custom Search API
async function searchGoogleContacts(query, industry, location) {
  try {
    console.log(`🔍 Buscando: ${query} en ${location}`);

    const searchQuery = `${query} ${industry} ${location} email contacto`;
    const response = await axios.get('https://www.googleapis.com/customsearch/v1', {
      params: {
        q: searchQuery,
        key: process.env.GOOGLE_API_KEY,
        cx: process.env.GOOGLE_SEARCH_ENGINE_ID,
        num: 10,
      },
    });

    return response.data.items || [];
  } catch (error) {
    console.error('❌ Error en búsqueda:', error.message);
    return [];
  }
}

// Extraer emails de texto
function extractEmails(text) {
  const emailRegex = /[a-zA-Z0-9._%-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}/g;
  return [...new Set(text.match(emailRegex) || [])];
}

// Scraping básico de contacto
async function scrapeContactInfo(url) {
  try {
    const response = await axios.get(url, { timeout: 5000 });
    const emails = extractEmails(response.data);
    return emails;
  } catch (error) {
    console.error(`⚠️ Error scraping ${url}:`, error.message);
    return [];
  }
}

// Buscar contactos por criterios
async function searchContacts(config) {
  const { industry, location, companySize = 'pymes' } = config;
  let leads = [];

  console.log(`\n🚀 Iniciando búsqueda de contactos`);
  console.log(`   Industria: ${industry}`);
  console.log(`   Ubicación: ${location}`);
  console.log(`   Tamaño: ${companySize}\n`);

  // Búsqueda 1: Google
  const googleResults = await searchGoogleContacts('empresa', industry, location);

  for (const result of googleResults) {
    const emails = await scrapeContactInfo(result.link);
    if (emails.length > 0) {
      leads.push({
        company: result.title,
        url: result.link,
        emails: emails,
        industry: industry,
        location: location,
        found_at: new Date().toISOString(),
        contacted: false,
      });
      console.log(`✅ Empresa encontrada: ${result.title}`);
    }
  }

  saveLeads(leads);
  return leads;
}

// Enviar email de presentación
async function contactLead(lead) {
  const email = lead.emails[0];
  if (!email) return false;

  const subject = `🌐 Transforma tu presencia online - Sitio web profesional para ${lead.company}`;
  const html = `
    <h2>¡Hola! 👋</h2>
    <p>Encontramos tu empresa <strong>${lead.company}</strong> y nos encantaría ayudarte.</p>

    <h3>Ofrecemos:</h3>
    <ul>
      <li>✨ Sitios web modernos y responsive</li>
      <li>📱 Optimizados para móviles</li>
      <li>🔍 SEO para mejorar tu visibilidad</li>
      <li>💼 Diseño profesional personalizado</li>
    </ul>

    <p><strong>¿Interesado en conocer más?</strong></p>
    <p>Contáctanos sin compromiso: <a href="mailto:${process.env.EMAIL_USER}">Enviar mensaje</a></p>

    <hr>
    <p><em>Saludos,<br>Equipo de Rotulweb</em></p>
  `;

  const result = await sendEmail(email, subject, '', html);

  if (result.success) {
    lead.contacted = true;
    lead.contacted_at = new Date().toISOString();
    console.log(`📧 Email enviado a: ${email}`);
  }

  return result.success;
}

// Contactar a todos los leads
async function contactAllLeads(leads = null) {
  if (!leads) leads = loadLeads();

  const uncontacted = leads.filter(l => !l.contacted);
  console.log(`\n📤 Contactando ${uncontacted.length} leads...\n`);

  for (const lead of uncontacted) {
    await contactLead(lead);
    // Esperar 2 segundos entre emails
    await new Promise(resolve => setTimeout(resolve, 2000));
  }

  saveLeads(leads);
}

// API Express para el dashboard
export async function setupSearchAgentAPI(app) {
  app.post('/api/search-contacts', async (req, res) => {
    const { industry, location } = req.body;
    if (!industry || !location) {
      return res.status(400).json({ error: 'Faltan industry o location' });
    }
    const leads = await searchContacts({ industry, location });
    res.json({ success: true, leads_found: leads.length, leads });
  });

  app.get('/api/leads', (req, res) => {
    const leads = loadLeads();
    res.json(leads);
  });

  app.post('/api/contact-leads', async (req, res) => {
    await contactAllLeads();
    res.json({ success: true, message: 'Leads contactados' });
  });

  app.delete('/api/leads/:index', (req, res) => {
    let leads = loadLeads();
    leads.splice(req.params.index, 1);
    saveLeads(leads);
    res.json({ success: true });
  });
}

export { searchContacts, contactAllLeads, loadLeads };
