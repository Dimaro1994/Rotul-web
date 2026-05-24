@echo off
REM TODO EN UNO - Setup + Inicio Automático

cd /d "c:\Users\marin\Desktop\Rotulweb\Rotulweb"

cls

echo.
echo ╔════════════════════════════════════════════════════════════════════════╗
echo ║                                                                        ║
echo ║            ⚡ SETUP TOTAL + INICIO AUTOMÁTICO                         ║
echo ║                                                                        ║
echo ║         Se hará TODO sin que hagas nada                              ║
echo ║                                                                        ║
echo ╚════════════════════════════════════════════════════════════════════════╝

echo.
echo FASE 1: Verificando e instalando dependencias...
echo ─────────────────────────────────────────────────

if not exist node_modules\express (
    echo ⏳ Instalando dependencias (esto puede tomar 1-2 minutos)...
    call node setup.js
    
    if errorlevel 1 (
        echo ❌ Error en la instalación
        pause
        exit /b 1
    )
) else (
    echo ✅ Dependencias ya están instaladas
)

echo.
echo FASE 2: Iniciando servidores...
echo ─────────────────────────────────────────────────

echo.
echo ✅ Todo está listo!
echo.
echo Se abrirán 2 ventanas:
echo   • Terminal 1: Backend (puerto 5000)
echo   • Terminal 2: Frontend (puerto 5173)
echo.
echo Presiona cualquier tecla para continuar...
pause >nul

REM Abrir backend en nueva ventana
echo Iniciando backend en nueva ventana...
start cmd /k "cd /d c:\Users\marin\Desktop\Rotulweb\Rotulweb && node server.js"

REM Esperar 3 segundos
timeout /t 3 /nobreak

REM Abrir frontend en nueva ventana
echo Iniciando frontend en nueva ventana...
start cmd /k "cd /d c:\Users\marin\Desktop\Rotulweb\Rotulweb && npm run dev"

echo.
echo.
echo ╔════════════════════════════════════════════════════════════════════════╗
echo ║                                                                        ║
echo ║            ✅ SISTEMA INICIADO CORRECTAMENTE                         ║
echo ║                                                                        ║
echo ║  Abre en el navegador:                                               ║
echo ║    http://localhost:5173                                             ║
echo ║                                                                        ║
echo ║  Deberías ver:                                                        ║
echo ║    - Tu sitio Rotulweb                                               ║
echo ║    - Botón verde de WhatsApp en esquina inferior derecha             ║
echo ║                                                                        ║
echo ║  ¡LISTO PARA USAR!                                                   ║
echo ║                                                                        ║
echo ╚════════════════════════════════════════════════════════════════════════╝

echo.
pause
