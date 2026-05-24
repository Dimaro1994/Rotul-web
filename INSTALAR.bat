@echo off
REM ============================================================================
REM Script de instalación automática - WhatsApp Integration para Rotulweb
REM ============================================================================

echo.
echo ╔════════════════════════════════════════════════════════════════════════╗
echo ║                                                                        ║
echo ║       INSTALACIÓN AUTOMÁTICA - WhatsApp Integration                   ║
echo ║                                                                        ║
echo ╚════════════════════════════════════════════════════════════════════════╝
echo.

REM Paso 1: Instalar dependencias del backend
echo [1/4] Instalando dependencias del backend...
echo ─────────────────────────────────────────────
npm install express dotenv axios cors body-parser
if errorlevel 1 (
    echo ❌ Error instalando dependencias
    pause
    exit /b 1
)
echo ✅ Dependencias instaladas

echo.

REM Paso 2: Crear archivo .env
echo [2/4] Configurando archivo .env...
echo ─────────────────────────────────────────────
if exist .env (
    echo ⚠️  .env ya existe, no se sobrescribe
) else (
    copy .env.example .env >nul
    echo ✅ Archivo .env creado
    echo.
    echo ⚠️  IMPORTANTE: Edita .env y agrega tus credenciales:
    echo    - WHATSAPP_PHONE_NUMBER_ID
    echo    - WHATSAPP_ACCESS_TOKEN
    echo    - WHATSAPP_BUSINESS_ACCOUNT_ID
)

echo.

REM Paso 3: Instalar concurrently (opcional)
echo [3/4] Instalando herramientas de desarrollo...
echo ─────────────────────────────────────────────
npm install --save-dev concurrently
if errorlevel 1 (
    echo ⚠️  Advertencia: concurrently no se instaló
) else (
    echo ✅ Herramientas instaladas
)

echo.

REM Paso 4: Verificación final
echo [4/4] Verificando instalación...
echo ─────────────────────────────────────────────

if exist node_modules\express (
    echo ✅ Express instalado
) else (
    echo ❌ Express NO se instaló
)

if exist .env (
    echo ✅ Archivo .env configurado
) else (
    echo ❌ Archivo .env NO existe
)

echo.
echo ╔════════════════════════════════════════════════════════════════════════╗
echo ║                                                                        ║
echo ║                   ✅ INSTALACIÓN COMPLETADA                          ║
echo ║                                                                        ║
echo ╚════════════════════════════════════════════════════════════════════════╝

echo.
echo 📖 PRÓXIMOS PASOS:
echo ─────────────────────────────────────────────
echo.
echo 1. Edita .env con tus credenciales de WhatsApp:
echo    Abre en editor: .env
echo.
echo 2. Inicia el backend (terminal 1):
echo    $ node server.js
echo.
echo 3. Inicia el frontend (terminal 2):
echo    $ npm run dev
echo.
echo 4. Agrega widget a App.jsx:
echo    - Abre: src/App.jsx
echo    - Importa: import WhatsAppWidget from './WhatsAppWidget';
echo    - Usa: %%lt;WhatsAppWidget /%%gt;
echo.
echo 5. ¡Listo! Abre http://localhost:5173
echo.
echo 📚 Para más información:
echo    - Lee: QUICK_START.md
echo    - O: START_HERE.txt
echo.

pause
