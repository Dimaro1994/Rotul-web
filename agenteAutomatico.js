#!/usr/bin/env node

import { spawn } from 'child_process';
import dotenv from 'dotenv';
import { isWithinWorkingHours } from './config/agentSchedule.js';

dotenv.config();

let runningProcesses = {
  backend: null,
  bot: null,
  frontend: null,
};


function startServices() {
  console.log('\n📅 Verificando horario de trabajo...');

  if (!isWithinWorkingHours()) {
    const now = new Date();
    const day = now.getDay();
    const hour = now.getHours();

    if (day === 0 || day === 6) {
      console.log('❌ Es fin de semana - Agente en descanso');
    } else {
      console.log(`❌ Fuera de horario (${hour}:00) - Horario: lunes a viernes de 8:00 a 19:00`);
    }
    return false;
  }

  console.log('✅ Dentro del horario de trabajo - Iniciando servicios...\n');

  // Iniciar Backend
  console.log('🖥️  Iniciando Backend...');
  runningProcesses.backend = spawn('npm', ['run', 'backend'], {
    stdio: 'inherit',
    shell: true,
  });

  // Iniciar Bot de Email
  console.log('🤖 Iniciando Bot de Email...');
  runningProcesses.bot = spawn('npm', ['run', 'email-bot'], {
    stdio: 'inherit',
    shell: true,
  });

  // Iniciar Frontend
  console.log('💻 Iniciando Frontend...');
  runningProcesses.frontend = spawn('npm', ['run', 'dev'], {
    stdio: 'inherit',
    shell: true,
  });

  return true;
}

function stopServices() {
  console.log('\n⏹️  Deteniendo servicios...');

  if (runningProcesses.backend) {
    runningProcesses.backend.kill();
    runningProcesses.backend = null;
  }

  if (runningProcesses.bot) {
    runningProcesses.bot.kill();
    runningProcesses.bot = null;
  }

  if (runningProcesses.frontend) {
    runningProcesses.frontend.kill();
    runningProcesses.frontend = null;
  }

  console.log('✅ Servicios detenidos\n');
}

function printSchedule() {
  console.log(`
╔════════════════════════════════════════════════════════════╗
║     AGENTE DE GESTIÓN DE CLIENTES - MODO AUTOMÁTICO       ║
╚════════════════════════════════════════════════════════════╝

📅 HORARIO DE TRABAJO:
   Lunes a Viernes: 8:00 AM - 7:00 PM
   Sábado y Domingo: CERRADO

⏱️  PRÓXIMAS ACCIONES:
   ✅ Cada lunes a viernes a las 8:00 AM → INICIA
   ✅ Cada lunes a viernes a las 8:00 PM → DETIENE
   ✅ Sábado y domingo → DESCANSO

📍 ESTADO ACTUAL:
  ` + (isWithinWorkingHours() ? '✅ ABIERTO - Sistema en funcionamiento' : '❌ CERRADO - Fuera de horario') + `

Presiona Ctrl+C para detener el monitor.
════════════════════════════════════════════════════════════
  `);
}

// Iniciar al ejecutar el script
console.log('Iniciando monitor de horario...');
printSchedule();

// Verificar cada minuto
setInterval(() => {
  const now = new Date();
  const isWorking = isWithinWorkingHours();

  // Si debe estar trabajando pero no está
  if (isWorking && !runningProcesses.backend) {
    console.log(`\n⏰ ${now.toLocaleTimeString()} - Iniciando servicios`);
    startServices();
  }
  // Si no debe estar trabajando pero está
  else if (!isWorking && runningProcesses.backend) {
    console.log(`\n⏰ ${now.toLocaleTimeString()} - Deteniendo servicios`);
    stopServices();
  }
}, 60000); // Verificar cada minuto

// Iniciar inmediatamente si está dentro del horario
if (isWithinWorkingHours()) {
  startServices();
}

// Manejar salida limpia
process.on('SIGINT', () => {
  console.log('\n\n👋 Deteniendo monitor...');
  stopServices();
  process.exit(0);
});
