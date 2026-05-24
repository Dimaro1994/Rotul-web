#!/usr/bin/env node

/**
 * INICIADOR AUTOMÁTICO - Inicia backend + frontend
 */

const { spawn } = require('child_process');
const path = require('path');

const projectRoot = path.dirname(__filename);

console.log(`
╔════════════════════════════════════════════════════════════════════════════╗
║                                                                            ║
║              🚀 INICIADOR AUTOMÁTICO - Abriendo servidores...             ║
║                                                                            ║
╚════════════════════════════════════════════════════════════════════════════╝
`);

console.log('\n📍 Proyecto: ' + projectRoot);

// Iniciar backend
console.log('\n🔧 [1/2] Iniciando backend (puerto 5000)...');
const backendProcess = spawn('node', ['server.js'], {
  cwd: projectRoot,
  stdio: 'inherit',
  shell: true
});

backendProcess.on('error', (error) => {
  console.error('❌ Error iniciando backend:', error.message);
});

// Esperar 3 segundos antes de iniciar frontend
setTimeout(() => {
  console.log('\n\n📱 [2/2] Iniciando frontend (puerto 5173)...');
  const frontendProcess = spawn('npm', ['run', 'dev'], {
    cwd: projectRoot,
    stdio: 'inherit',
    shell: true
  });

  frontendProcess.on('error', (error) => {
    console.error('❌ Error iniciando frontend:', error.message);
  });
}, 3000);

console.log(`
═════════════════════════════════════════════════════════════════════════════

Ambos servidores se están iniciando:
  • Backend:  http://localhost:5000
  • Frontend: http://localhost:5173

Se abrirá automáticamente en el navegador en unos segundos...

Presiona Ctrl+C en cualquier terminal para detener

═════════════════════════════════════════════════════════════════════════════
`);
