#!/usr/bin/env node

import fs from 'fs';
import path from 'path';

console.log(`
╔════════════════════════════════════════════════════════════════╗
║                                                                ║
║     🧪 TEST DEL AGENTE - VERIFICA QUE FUNCIONA                ║
║                                                                ║
╚════════════════════════════════════════════════════════════════╝
`);

// Función para verificar archivos creados
function verificarArchivos() {
  console.log('\n📁 VERIFICAR ARCHIVOS CREADOS\n');

  const archivos = [
    'models/Client.js',
    'models/Task.js',
    'config/database.js',
    'routes/clients.js',
    'notifications.js',
    'src/components/Dashboard.jsx',
    'src/components/ClientForm.jsx',
    'src/AppRouter.jsx',
    'src/styles/Dashboard.css',
    'src/styles/ClientForm.css',
    'agenteAutomatico.js'
  ];

  console.log('Verificando archivos del sistema:\n');

  let todosOk = true;
  archivos.forEach(archivo => {
    const existe = fs.existsSync(archivo);
    const simbolo = existe ? '✅' : '❌';
    console.log(`${simbolo} ${archivo}`);
    if (!existe) todosOk = false;
  });

  return todosOk;
}

// Función para verificar paquetes instalados
function verificarDependencias() {
  console.log('\n📦 VERIFICAR DEPENDENCIAS\n');

  const packageJson = JSON.parse(fs.readFileSync('package.json', 'utf8'));
  const dependencies = { ...packageJson.dependencies, ...packageJson.devDependencies };

  const necesarios = ['mongoose', 'express', 'nodemailer', 'cors', 'dotenv'];

  console.log('Paquetes instalados:\n');

  let todosOk = true;
  necesarios.forEach(dep => {
    const existe = dependencies[dep] ? true : false;
    const simbolo = existe ? '✅' : '❌';
    const version = dependencies[dep] || 'NO INSTALADO';
    console.log(`${simbolo} ${dep}: ${version}`);
    if (!existe) todosOk = false;
  });

  return todosOk;
}

// Función para verificar .env
function verificarEnv() {
  console.log('\n⚙️  VERIFICAR CONFIGURACIÓN (.env)\n');

  const envPath = '.env';
  if (!fs.existsSync(envPath)) {
    console.log('❌ Archivo .env no encontrado');
    return false;
  }

  const envContent = fs.readFileSync(envPath, 'utf8');
  const variables = ['MONGODB_URI', 'EMAIL_USER', 'SMTP_HOST', 'PORT'];

  console.log('Variables de entorno:\n');

  let todosOk = true;
  variables.forEach(varName => {
    const existe = envContent.includes(varName);
    const simbolo = existe ? '✅' : '❌';
    console.log(`${simbolo} ${varName}`);
    if (!existe) todosOk = false;
  });

  return todosOk;
}

// Función para simular el agente en diferentes horas
function simularHorarios() {
  console.log('\n⏰ SIMULAR DIFERENTES HORARIOS\n');

  const horariosTest = [
    { dia: 'Lunes', dayOfWeek: 1, hora: 8, debeEstar: 'ABIERTO' },
    { dia: 'Lunes', dayOfWeek: 1, hora: 12, debeEstar: 'ABIERTO' },
    { dia: 'Lunes', dayOfWeek: 1, hora: 19, debeEstar: 'ABIERTO' },
    { dia: 'Lunes', dayOfWeek: 1, hora: 20, debeEstar: 'CERRADO' },
    { dia: 'Lunes', dayOfWeek: 1, hora: 23, debeEstar: 'CERRADO' },
    { dia: 'Viernes', dayOfWeek: 5, hora: 8, debeEstar: 'ABIERTO' },
    { dia: 'Viernes', dayOfWeek: 5, hora: 20, debeEstar: 'CERRADO' },
    { dia: 'Sábado', dayOfWeek: 6, hora: 12, debeEstar: 'CERRADO' },
    { dia: 'Domingo', dayOfWeek: 0, hora: 12, debeEstar: 'CERRADO' },
  ];

  console.log('Simulación de horarios:\n');

  horariosTest.forEach(test => {
    const esFinde = test.dayOfWeek === 0 || test.dayOfWeek === 6;
    const esDentroDeTrabajo = test.hora >= 8 && test.hora < 20;

    let estado;
    if (esFinde) {
      estado = 'CERRADO';
    } else if (esDentroDeTrabajo) {
      estado = 'ABIERTO';
    } else {
      estado = 'CERRADO';
    }

    const hora = String(test.hora).padStart(2, '0') + ':00';
    const correcto = estado === test.debeEstar ? '✅' : '❌';
    const esperado = estado === test.debeEstar ? '' : ` (esperaba: ${test.debeEstar})`;

    console.log(`${correcto} ${test.dia} ${hora} → ${estado}${esperado}`);
  });
}

// Función para crear un cliente de prueba
function crearClientePrueba() {
  console.log('\n🧪 CREAR CLIENTE DE PRUEBA\n');

  console.log('Para probar que crea clientes, necesitas:');
  console.log('');
  console.log('1. Asegúrate de que MongoDB está corriendo:');
  console.log('   - Windows Services → busca "MongoDB"');
  console.log('   - Debe estar en estado "Running"');
  console.log('');
  console.log('2. Inicia el sistema:');
  console.log('   npm run start:all');
  console.log('');
  console.log('3. Abre el dashboard:');
  console.log('   http://localhost:5173?admin=dashboard');
  console.log('');
  console.log('4. Haz clic en "➕ Nuevo Cliente"');
  console.log('');
  console.log('5. Llena el formulario:');
  console.log('   - Empresa: "Test Empresa"');
  console.log('   - Contacto: "Tu Nombre"');
  console.log('   - Email: "tu@email.com"');
  console.log('   - Teléfono: "+34123456789"');
  console.log('   - Proyecto: "website"');
  console.log('');
  console.log('6. Haz clic en "✅ Crear Cliente"');
  console.log('');
  console.log('✅ SI FUNCIONA:');
  console.log('   • El cliente aparece en el dashboard');
  console.log('   • Recibes un email de confirmación');
  console.log('   • Las estadísticas se actualizan');
  console.log('');
}

// Función para verificar puertos
function verificarPuertos() {
  console.log('\n🌐 VERIFICAR PUERTOS\n');

  console.log('Puertos que debería estar usando el agente:\n');
  console.log('✅ Puerto 5000 - Backend (npm run backend)');
  console.log('✅ Puerto 3001 - Bot Email (npm run email-bot)');
  console.log('✅ Puerto 5173 - Frontend (npm run dev)');
  console.log('');
  console.log('Para verificar si están en uso en Windows:');
  console.log('  netstat -ano | findstr :5000');
  console.log('  netstat -ano | findstr :3001');
  console.log('  netstat -ano | findstr :5173');
  console.log('');
}

// Función para test de API
function verificarAPI() {
  console.log('\n🔌 TEST DE API\n');

  console.log('Para verificar que la API funciona:\n');
  console.log('1. Asegúrate de que el backend está corriendo:');
  console.log('   npm run backend\n');
  console.log('2. Abre en navegador (o usa curl):');
  console.log('   http://localhost:5000/health\n');
  console.log('3. Debería mostrar:');
  console.log('   {"status":"OK","message":"Rotulweb API running"}\n');
  console.log('4. Para ver estadísticas:');
  console.log('   http://localhost:5000/api/dashboard/stats\n');
  console.log('5. Para ver clientes:');
  console.log('   http://localhost:5000/api/clients\n');
}

// Menú principal
function menuPrincipal() {
  console.log('\n═══════════════════════════════════════════════════════════════\n');
  console.log('🎯 SELECCIONA UNA PRUEBA:\n');
  console.log('1. ✅ Verificar archivos creados');
  console.log('2. 📦 Verificar dependencias');
  console.log('3. ⚙️  Verificar configuración (.env)');
  console.log('4. ⏰ Simular horarios del agente');
  console.log('5. 🧪 Crear cliente de prueba');
  console.log('6. 🌐 Verificar puertos');
  console.log('7. 🔌 Test de API');
  console.log('8. 🎬 EJECUTAR TODAS LAS PRUEBAS\n');
}

// Ejecutar todas las pruebas
function ejecutarTodasPruebas() {
  let todasOk = true;

  todasOk = verificarArchivos() && todasOk;
  todasOk = verificarDependencias() && todasOk;
  todasOk = verificarEnv() && todasOk;
  simularHorarios();
  verificarPuertos();
  verificarAPI();
  crearClientePrueba();

  console.log('\n═══════════════════════════════════════════════════════════════\n');
  if (todasOk) {
    console.log('✅ TODAS LAS VERIFICACIONES PASARON');
    console.log('\n¡Tu agente está listo para funcionar!\n');
  } else {
    console.log('⚠️  Algunas verificaciones fallaron');
    console.log('Lee los mensajes arriba para saber qué revisar\n');
  }
}

// Mostrar menú y ejecutar
menuPrincipal();

// Si se ejecuta con parámetro, ejecuta esa prueba
const args = process.argv.slice(2);
if (args[0]) {
  switch (args[0]) {
    case '1':
      verificarArchivos();
      break;
    case '2':
      verificarDependencias();
      break;
    case '3':
      verificarEnv();
      break;
    case '4':
      simularHorarios();
      break;
    case '5':
      crearClientePrueba();
      break;
    case '6':
      verificarPuertos();
      break;
    case '7':
      verificarAPI();
      break;
    case '8':
      ejecutarTodasPruebas();
      break;
    default:
      console.log('Opción no válida');
  }
} else {
  // Ejecutar todas por defecto
  console.log('\nEjecutando todas las pruebas...\n');
  ejecutarTodasPruebas();
}
