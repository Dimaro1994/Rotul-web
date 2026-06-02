import instagramLeadAgent from './instagramLeadAgent.js';
import leadStore from './services/leadStore.js';
import readline from 'readline';

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

const question = (prompt) => new Promise((resolve) => rl.question(prompt, resolve));

async function mainMenu() {
  console.log('\n📱 GESTOR DE LEADS INSTAGRAM');
  console.log('================================');
  console.log('1. Ver leads principales');
  console.log('2. Agregar nuevo lead');
  console.log('3. Ver leads por estado');
  console.log('4. Contactar lead');
  console.log('5. Registrar respuesta');
  console.log('6. Establecer recordatorio');
  console.log('7. Convertir a cliente');
  console.log('8. Ver estadísticas');
  console.log('9. Ver recordatorios próximos');
  console.log('10. Reporte diario');
  console.log('0. Salir\n');

  const choice = await question('Selecciona opción: ');
  return choice;
}

async function viewTopLeads() {
  try {
    const leads = instagramLeadAgent.getTopLeads(10);
    console.log('\n🔝 TOP LEADS (Por puntuación)\n');
    console.table(leads.map(l => ({
      Usuario: l.instagramUsername,
      Puntuación: l.leadScore,
      Estado: l.status,
      Seguidores: l.followerCount,
      Interacciones: l.interactionCount
    })));
  } catch (error) {
    console.error('Error:', error.message);
  }
}

async function addNewLead() {
  try {
    console.log('\n➕ AGREGAR NUEVO LEAD\n');

    const leadData = {
      instagramUsername: await question('Usuario de Instagram (@usuario): '),
      followerCount: parseInt(await question('Cantidad de seguidores: ')) || 0,
      followingCount: parseInt(await question('Cantidad que sigue: ')) || 0,
      bio: await question('Bio (o descripción): '),
      industry: await question('Industria (opcional): ') || undefined,
      isFollower: (await question('¿Es tu follower? (s/n): ')).toLowerCase() === 's',
      notes: await question('Notas (opcional): ') || undefined
    };

    const lead = instagramLeadAgent.addNewLead(leadData);
    console.log('\n✅ Lead agregado exitosamente');
    console.log('Puntuación asignada:', lead.leadScore);
  } catch (error) {
    console.error('Error:', error.message);
  }
}

async function viewLeadsByStatus() {
  try {
    console.log('\n📊 LEADS POR ESTADO\n');
    console.log('1. new (Nuevos)');
    console.log('2. contacted (Contactados)');
    console.log('3. interested (Interesados)');
    console.log('4. quoted (Cotizados)');
    console.log('5. converted (Convertidos)');
    console.log('6. rejected (Rechazados)\n');

    const statusMap = {
      '1': 'new',
      '2': 'contacted',
      '3': 'interested',
      '4': 'quoted',
      '5': 'converted',
      '6': 'rejected'
    };

    const choice = await question('Selecciona estado: ');
    const status = statusMap[choice];

    if (!status) {
      console.log('Opción inválida');
      return;
    }

    const leads = instagramLeadAgent.getLeadsByStatus(status, 20);
    console.log(`\n📋 Leads con estado "${status}":\n`);

    if (leads.length === 0) {
      console.log('No hay leads con este estado');
      return;
    }

    console.table(leads.map(l => ({
      Usuario: l.instagramUsername,
      Puntuación: l.leadScore,
      'Últ. Interacción': l.lastInteractionDate ? new Date(l.lastInteractionDate).toLocaleDateString() : 'Nunca',
      Mensajes: l.messagesSent,
      Respuestas: l.messageResponses
    })));
  } catch (error) {
    console.error('Error:', error.message);
  }
}

async function contactLead() {
  try {
    console.log('\n💬 MARCAR COMO CONTACTADO\n');

    const username = await question('Usuario de Instagram (sin @): ');
    const lead = leadStore.findByUsername('@' + username);

    if (!lead) {
      console.log('Lead no encontrado');
      return;
    }

    const message = await question('Mensaje enviado: ');

    instagramLeadAgent.markAsContacted(lead.id, { message });
    console.log('✅ Contacto registrado');
  } catch (error) {
    console.error('Error:', error.message);
  }
}

async function logResponse() {
  try {
    console.log('\n💌 REGISTRAR RESPUESTA\n');

    const username = await question('Usuario de Instagram (sin @): ');
    const lead = leadStore.findByUsername('@' + username);

    if (!lead) {
      console.log('Lead no encontrado');
      return;
    }

    const isInterested = (await question('¿Mostró interés? (s/n): ')).toLowerCase() === 's';

    instagramLeadAgent.logResponse(lead.id, { isInterested });
    console.log('✅ Respuesta registrada');
  } catch (error) {
    console.error('Error:', error.message);
  }
}

async function setReminder() {
  try {
    console.log('\n⏰ ESTABLECER RECORDATORIO\n');

    const username = await question('Usuario de Instagram (sin @): ');
    const lead = leadStore.findByUsername('@' + username);

    if (!lead) {
      console.log('Lead no encontrado');
      return;
    }

    const daysAhead = parseInt(await question('Días desde hoy: '));
    const reminderDate = new Date();
    reminderDate.setDate(reminderDate.getDate() + daysAhead);

    const message = await question('Mensaje del recordatorio: ');

    instagramLeadAgent.setReminder(lead.id, reminderDate, message);
    console.log('✅ Recordatorio establecido para', reminderDate.toLocaleDateString());
  } catch (error) {
    console.error('Error:', error.message);
  }
}

async function convertToClient() {
  try {
    console.log('\n🎯 CONVERTIR A CLIENTE\n');

    const username = await question('Usuario de Instagram (sin @): ');
    const lead = leadStore.findByUsername('@' + username);

    if (!lead) {
      console.log('Lead no encontrado');
      return;
    }

    const clientData = {
      companyName: await question('Nombre de empresa: '),
      contactName: await question('Nombre de contacto: '),
      email: await question('Email: '),
      phone: await question('Teléfono: '),
      projectType: await question('Tipo de proyecto (website/design/both): '),
      projectDescription: await question('Descripción del proyecto: '),
      budget: parseInt(await question('Presupuesto: ')) || 0
    };

    instagramLeadAgent.convertToClient(lead.id, clientData);
    console.log('✅ Lead convertido a cliente');
  } catch (error) {
    console.error('Error:', error.message);
  }
}

async function viewStats() {
  try {
    console.log('\n📈 ESTADÍSTICAS\n');
    const stats = instagramLeadAgent.getLeadStats();

    console.log('Total de leads:', stats.total);
    console.log('Leads convertidos:', stats.converted);
    console.log('Puntuación promedio:', stats.avgLeadScore);

    console.log('\nPor estado:');
    Object.entries(stats.byStatus).forEach(([status, count]) => console.log(`  ${status}: ${count}`));

    console.log('\nPor calidad:');
    Object.entries(stats.byQuality).forEach(([quality, count]) => console.log(`  ${quality}: ${count}`));
  } catch (error) {
    console.error('Error:', error.message);
  }
}

async function upcomingReminders() {
  try {
    console.log('\n⏰ RECORDATORIOS PRÓXIMOS (7 días)\n');
    const reminders = instagramLeadAgent.getUpcomingReminders(7);

    if (reminders.length === 0) {
      console.log('No hay recordatorios próximos');
      return;
    }

    console.table(reminders.map(r => ({
      Usuario: r.instagramUsername,
      Fecha: new Date(r.reminderDate).toLocaleDateString(),
      Mensaje: r.reminderMessage
    })));
  } catch (error) {
    console.error('Error:', error.message);
  }
}

async function dailyReport() {
  try {
    console.log('\n📅 REPORTE DIARIO\n');
    const report = instagramLeadAgent.getDailyReport();

    console.log('Fecha:', new Date(report.date).toLocaleDateString());
    console.log('\n📌 Recordatorios de hoy:', report.remindersToday.length);
    report.remindersToday.forEach(r => {
      console.log(`  • ${r.instagramUsername}: ${r.reminderMessage}`);
    });

    console.log('\n➕ Leads nuevos hoy:', report.newLeadsToday.length);
    report.newLeadsToday.forEach(l => {
      console.log(`  • ${l.instagramUsername} (Puntuación: ${l.leadScore})`);
    });

    console.log('\n💬 Respuestas recibidas hoy:', report.responses.length);
    report.responses.forEach(r => {
      console.log(`  • ${r.instagramUsername}`);
    });

    console.log('\n📊 Estadísticas totales:');
    console.log('  Total de leads:', report.stats.total);
    console.log('  Convertidos:', report.stats.converted);
  } catch (error) {
    console.error('Error:', error.message);
  }
}

async function main() {
  console.log('🚀 Instagram Lead Manager iniciado\n');

  let running = true;
  while (running) {
    const choice = await mainMenu();

    switch (choice) {
      case '1':
        await viewTopLeads();
        break;
      case '2':
        await addNewLead();
        break;
      case '3':
        await viewLeadsByStatus();
        break;
      case '4':
        await contactLead();
        break;
      case '5':
        await logResponse();
        break;
      case '6':
        await setReminder();
        break;
      case '7':
        await convertToClient();
        break;
      case '8':
        await viewStats();
        break;
      case '9':
        await upcomingReminders();
        break;
      case '10':
        await dailyReport();
        break;
      case '0':
        console.log('\n👋 Hasta luego!');
        running = false;
        break;
      default:
        console.log('Opción inválida');
    }
  }

  rl.close();
}

main().catch(console.error);
