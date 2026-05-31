#!/usr/bin/env node

import axios from 'axios';
import readline from 'readline';
import fs from 'fs';

const API_URL = 'http://localhost:3001/api';

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

function question(prompt) {
  return new Promise(resolve => rl.question(prompt, resolve));
}

async function searchContacts() {
  console.log('\n🔍 BÚSQUEDA DE CONTACTOS');
  const industry = await question('Industria (ej: restaurantes, tiendas): ');
  const location = await question('Ubicación (ej: Barcelona, Madrid): ');

  try {
    console.log('\n⏳ Buscando...');
    const response = await axios.post(`${API_URL}/search-contacts`, {
      industry,
      location,
    });

    console.log(`\n✅ Encontrados ${response.data.leads_found} contactos\n`);
    response.data.leads.forEach((lead, i) => {
      console.log(`${i + 1}. ${lead.company}`);
      console.log(`   📧 ${lead.emails.join(', ')}`);
      console.log(`   🔗 ${lead.url}\n`);
    });
  } catch (error) {
    console.error('❌ Error:', error.response?.data || error.message);
  }
}

async function viewLeads() {
  try {
    const response = await axios.get(`${API_URL}/leads`);
    console.log(`\n📋 TOTAL DE LEADS: ${response.data.length}\n`);

    const contacted = response.data.filter(l => l.contacted).length;
    const pending = response.data.length - contacted;

    console.log(`✅ Contactados: ${contacted}`);
    console.log(`⏳ Pendientes: ${pending}\n`);

    response.data.forEach((lead, i) => {
      const status = lead.contacted ? '✅' : '⏳';
      console.log(`${status} ${i}. ${lead.company}`);
      console.log(`   📧 ${lead.emails[0]}`);
      if (lead.contacted_at) {
        console.log(`   📤 Contactado: ${new Date(lead.contacted_at).toLocaleString()}`);
      }
      console.log();
    });
  } catch (error) {
    console.error('❌ Error:', error.message);
  }
}

async function contactAll() {
  const confirm = await question('¿Enviar emails a todos los leads pendientes? (s/n): ');
  if (confirm.toLowerCase() !== 's') {
    console.log('❌ Cancelado');
    return;
  }

  try {
    console.log('\n⏳ Enviando emails...');
    await axios.post(`${API_URL}/contact-leads`);
    console.log('✅ Todos los leads han sido contactados');
  } catch (error) {
    console.error('❌ Error:', error.message);
  }
}

async function deleteLead() {
  const index = await question('Número del lead a eliminar: ');
  try {
    await axios.delete(`${API_URL}/leads/${index}`);
    console.log('✅ Lead eliminado');
  } catch (error) {
    console.error('❌ Error:', error.message);
  }
}

async function showMenu() {
  console.log('\n╔════════════════════════════════════════╗');
  console.log('║       🤖 SEARCH AGENT - MENU PRINCIPAL║');
  console.log('╚════════════════════════════════════════╝\n');
  console.log('1. 🔍 Buscar contactos');
  console.log('2. 📋 Ver todos los leads');
  console.log('3. 📧 Contactar todos los pendientes');
  console.log('4. 🗑️  Eliminar un lead');
  console.log('5. ❌ Salir\n');
}

async function main() {
  console.log('\n🚀 Search Agent CLI');
  console.log('Conectando a http://localhost:3001...\n');

  try {
    await axios.get(`${API_URL}/leads`);
    console.log('✅ Conectado correctamente\n');
  } catch (error) {
    console.error('❌ Error de conexión. ¿Está el bot en ejecución?');
    console.error('Ejecuta: npm run email-bot');
    process.exit(1);
  }

  let running = true;
  while (running) {
    await showMenu();
    const option = await question('Elige una opción (1-5): ');

    switch (option) {
      case '1':
        await searchContacts();
        break;
      case '2':
        await viewLeads();
        break;
      case '3':
        await contactAll();
        break;
      case '4':
        await viewLeads();
        await deleteLead();
        break;
      case '5':
        running = false;
        console.log('\n👋 ¡Hasta luego!\n');
        break;
      default:
        console.log('❌ Opción inválida');
    }
  }

  rl.close();
}

main().catch(console.error);
