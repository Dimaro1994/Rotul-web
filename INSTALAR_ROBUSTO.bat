@echo off
REM Script robusto de instalación - Maneja errores

cd /d "c:\Users\marin\Desktop\Rotulweb\Rotulweb"

echo.
echo ╔════════════════════════════════════════════════════════════════════════╗
echo ║                                                                        ║
echo ║        INSTALACIÓN ROBUSTA - WhatsApp Backend Dependencies            ║
echo ║                                                                        ║
echo ╚════════════════════════════════════════════════════════════════════════╝

echo.
echo Verificando npm...
npm --version
if errorlevel 1 (
    echo ❌ ERROR: npm no está instalado o no se encontró
    echo.
    echo Por favor instala Node.js desde: https://nodejs.org
    pause
    exit /b 1
)
echo ✅ npm está disponible

echo.
echo ═════════════════════════════════════════════════════════════════════════
echo INSTALANDO DEPENDENCIAS DEL BACKEND
echo ═════════════════════════════════════════════════════════════════════════

REM Método 1: Instalación normal
echo.
echo [Intento 1] Instalando con parámetros estándar...
npm install express dotenv axios cors body-parser concurrently

if errorlevel 1 (
    echo.
    echo ⚠️  Método 1 falló, intentando Método 2...
    
    REM Método 2: Uno por uno sin concurrently
    echo.
    echo [Intento 2] Instalando uno por uno...
    
    npm install express --save
    npm install dotenv --save
    npm install axios --save
    npm install cors --save
    npm install body-parser --save
    
    REM Intenta concurrently aparte
    echo.
    echo [Intento 3] Instalando concurrently por separado...
    npm install --save-dev concurrently
    
    if errorlevel 1 (
        echo ⚠️  concurrently optional (no es crítico)
    )
)

echo.
echo ═════════════════════════════════════════════════════════════════════════
echo VERIFICACIÓN FINAL
echo ═════════════════════════════════════════════════════════════════════════

echo.
echo Archivos necesarios:
if exist "server.js" echo ✅ server.js
if exist "whatsappController.js" echo ✅ whatsappController.js
if exist "whatsappRoutes.js" echo ✅ whatsappRoutes.js
if exist ".env" echo ✅ .env
if exist "package.json" echo ✅ package.json

echo.
echo Módulos instalados:
if exist "node_modules\express" echo ✅ express
if exist "node_modules\dotenv" echo ✅ dotenv
if exist "node_modules\axios" echo ✅ axios
if exist "node_modules\cors" echo ✅ cors
if exist "node_modules\body-parser" echo ✅ body-parser
if exist "node_modules\concurrently" echo ✅ concurrently
if not exist "node_modules\concurrently" echo ⚠️  concurrently (opcional)

echo.
echo ═════════════════════════════════════════════════════════════════════════
echo ✅ INSTALACIÓN COMPLETADA
echo ═════════════════════════════════════════════════════════════════════════

echo.
echo PRÓXIMOS PASOS:
echo.
echo 1. Abre .env y edita con tus credenciales WhatsApp:
echo    WHATSAPP_PHONE_NUMBER_ID=...
echo    WHATSAPP_ACCESS_TOKEN=...
echo.
echo 2. Abre Terminal 1 y ejecuta:
echo    node server.js
echo.
echo 3. Abre Terminal 2 y ejecuta:
echo    npm run dev
echo.
echo 4. Abierto: http://localhost:5173
echo.
echo 5. ¡VES EL BOTÓN VERDE DE WHATSAPP! 🟢
echo.

pause
