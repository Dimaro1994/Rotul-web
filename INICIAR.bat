@echo off
REM Script para iniciar backend y frontend en paralelo

echo.
echo ╔════════════════════════════════════════════════════════════════════════╗
echo ║                                                                        ║
echo ║              🚀 Iniciando WhatsApp Integration                        ║
echo ║                                                                        ║
echo ╚════════════════════════════════════════════════════════════════════════╝

echo.
echo Este script abrirá dos ventanas de terminal:
echo   • Terminal 1: Backend Express (puerto 5000)
echo   • Terminal 2: Frontend Vite (puerto 5173)
echo.
echo Presiona cualquier tecla para continuar...
pause >nul

REM Abrir backend en nueva ventana
echo Iniciando backend...
start cmd /k "node server.js"

REM Esperar un poco para que el backend se inicie
timeout /t 3 /nobreak

REM Abrir frontend en nueva ventana
echo Iniciando frontend...
start cmd /k "npm run dev"

echo.
echo ✅ Ambos servidores están iniciándose
echo.
echo Espera a que aparezcan las dos ventanas de terminal:
echo   • Backend: http://localhost:5000
echo   • Frontend: http://localhost:5173
echo.
echo Si todo va bien, se abrirá automáticamente en el navegador.
echo.
pause
