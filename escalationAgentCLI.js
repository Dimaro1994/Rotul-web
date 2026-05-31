#!/usr/bin/env node

import { escalateConfusedLeads, checkForResponses, getEscalationStats } from './escalationAgent.js';

const command = process.argv[2];

async function main() {
  console.log('\n🚀 ESCALATION AGENT - CLI\n');

  switch (command) {
    case 'escalate':
      console.log('📤 Iniciando proceso de escalonamiento...\n');
      await escalateConfusedLeads();
      break;

    case 'check-responses':
      console.log('📧 Verificando respuestas de clientes...\n');
      await checkForResponses();
      break;

    case 'stats':
      console.log('📊 Estadísticas de escalonamiento:\n');
      const stats = getEscalationStats();
      console.log(JSON.stringify(stats, null, 2));
      break;

    case 'help':
    default:
      console.log(`
Comandos disponibles:

  node escalationAgentCLI.js escalate
    → Busca clientes confusos y envía emails de escalonamiento

  node escalationAgentCLI.js check-responses
    → Verifica si hay nuevas respuestas de clientes

  node escalationAgentCLI.js stats
    → Muestra estadísticas de escalonamiento

  node escalationAgentCLI.js help
    → Muestra esta ayuda

Ejemplos:
  node escalationAgentCLI.js escalate
  node escalationAgentCLI.js stats
      `);
      break;
  }
}

main().catch(console.error);
