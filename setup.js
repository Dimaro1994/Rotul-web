#!/usr/bin/env node

/**
 * SETUP AUTOMÁTICO - Instala todo lo necesario
 * Ejecuta: node setup.js
 */

const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

console.log(`
╔════════════════════════════════════════════════════════════════════════════╗
║                                                                            ║
║              🔧 SETUP AUTOMÁTICO - Instalando todo...                     ║
║                                                                            ║
╚════════════════════════════════════════════════════════════════════════════╝
`);

const projectRoot = __dirname;
const packageJsonPath = path.join(projectRoot, 'package.json');
const envPath = path.join(projectRoot, '.env');
const envExamplePath = path.join(projectRoot, '.env.example');

// Función para ejecutar comandos
function run(command) {
  console.log(`\n📍 Ejecutando: ${command}`);
  try {
    execSync(command, { stdio: 'inherit', cwd: projectRoot });
    return true;
  } catch (error) {
    console.error(`❌ Error: ${error.message}`);
    return false;
  }
}

// Paso 1: Verificar Node.js
console.log('\n[1/6] Verificando Node.js...');
try {
  const nodeVersion = execSync('node --version', { encoding: 'utf-8' });
  console.log(`✅ Node.js ${nodeVersion.trim()} detectado`);
} catch (error) {
  console.error('❌ Node.js no está instalado');
  process.exit(1);
}

// Paso 2: Verificar npm
console.log('\n[2/6] Verificando npm...');
try {
  const npmVersion = execSync('npm --version', { encoding: 'utf-8' });
  console.log(`✅ npm ${npmVersion.trim()} detectado`);
} catch (error) {
  console.error('❌ npm no está instalado');
  process.exit(1);
}

// Paso 3: Limpiar caché
console.log('\n[3/6] Limpiando caché de npm...');
run('npm cache clean --force');

// Paso 4: Instalar dependencias
console.log('\n[4/6] Instalando dependencias del backend...');
const dependencies = [
  'express',
  'dotenv',
  'axios',
  'cors',
  'body-parser'
];

for (const dep of dependencies) {
  console.log(`\n  → Instalando ${dep}...`);
  run(`npm install ${dep} --save --legacy-peer-deps`);
}

// Paso 5: Instalar herramientas dev
console.log('\n[5/6] Instalando concurrently...');
run('npm install concurrently --save-dev --legacy-peer-deps');

// Paso 6: Crear .env si no existe
console.log('\n[6/6] Configurando variables de entorno...');
if (!fs.existsSync(envPath)) {
  if (fs.existsSync(envExamplePath)) {
    fs.copyFileSync(envExamplePath, envPath);
    console.log('✅ Archivo .env creado desde .env.example');
  }
} else {
  console.log('✅ Archivo .env ya existe');
}

// Verificación final
console.log(`

╔════════════════════════════════════════════════════════════════════════════╗
║                                                                            ║
║                    ✅ SETUP COMPLETADO                                    ║
║                                                                            ║
╚════════════════════════════════════════════════════════════════════════════╝
`);

console.log('Módulos instalados:');
const modules = ['express', 'dotenv', 'axios', 'cors', 'body-parser', 'concurrently'];
for (const mod of modules) {
  const modulePath = path.join(projectRoot, 'node_modules', mod);
  if (fs.existsSync(modulePath)) {
    console.log(`  ✅ ${mod}`);
  } else {
    console.log(`  ❌ ${mod} (no encontrado)`);
  }
}

console.log(`

📖 PRÓXIMOS PASOS:
─────────────────────────────────────────────────────────────────────────────

1. Edita .env con tus credenciales WhatsApp:
   - WHATSAPP_PHONE_NUMBER_ID
   - WHATSAPP_ACCESS_TOKEN
   - WHATSAPP_BUSINESS_ACCOUNT_ID
   - WHATSAPP_WEBHOOK_VERIFY_TOKEN

2. Terminal 1 - Inicia el backend:
   $ node server.js

3. Terminal 2 - Inicia el frontend:
   $ npm run dev

4. ¡LISTO! Abierto en http://localhost:5173

═════════════════════════════════════════════════════════════════════════════
`);

process.exit(0);
