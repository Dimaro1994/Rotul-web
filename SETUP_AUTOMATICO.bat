@echo off
REM SETUP TOTAL AUTOMATIZADO - Ejecuta setup.js

cd /d "c:\Users\marin\Desktop\Rotulweb\Rotulweb"

echo.
echo ╔════════════════════════════════════════════════════════════════════════╗
echo ║                                                                        ║
echo ║            🚀 SETUP TOTAL AUTOMÁTICO - Instalando...                  ║
echo ║                                                                        ║
echo ║         Se instalará todo automáticamente sin intervención            ║
echo ║                                                                        ║
echo ╚════════════════════════════════════════════════════════════════════════╝

echo.
echo Iniciando Node.js setup...
echo.

node setup.js

if errorlevel 1 (
    echo.
    echo ❌ Error durante el setup
    echo.
    pause
    exit /b 1
)

echo.
echo ╔════════════════════════════════════════════════════════════════════════╗
echo ║                        ✅ TODO LISTO                                  ║
echo ╚════════════════════════════════════════════════════════════════════════╝

echo.
echo Siguientes pasos:
echo.
echo 1. Edita .env (opcional si ya está configurado)
echo.
echo 2. Abre Terminal 1 y ejecuta:
echo    node server.js
echo.
echo 3. Abre Terminal 2 y ejecuta:
echo    npm run dev
echo.
echo ¡LISTO! Tu agente de WhatsApp funciona en http://localhost:5173
echo.

pause
