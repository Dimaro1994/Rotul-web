@echo off
REM Script de verificación - WhatsApp Integration

echo.
echo ╔════════════════════════════════════════════════════════════════════════╗
echo ║                                                                        ║
echo ║              ✓ VERIFICACIÓN DE INSTALACIÓN                           ║
echo ║                                                                        ║
echo ╚════════════════════════════════════════════════════════════════════════╝

echo.
echo Verificando archivos del proyecto...
echo ─────────────────────────────────────────────

setlocal enabledelayedexpansion

REM Archivos críticos a verificar
set archivos=^
server.js^
whatsappController.js^
whatsappRoutes.js^
src\WhatsAppWidget.jsx^
src\WhatsAppWidget.css^
.env^
package.json

set count=0
set found=0

for %%i in (%archivos%) do (
    set /a count+=1
    if exist "%%i" (
        set /a found+=1
        echo ✅ %%i
    ) else (
        echo ❌ %%i (FALTA)
    )
)

echo.
echo Verificando dependencias instaladas...
echo ─────────────────────────────────────────────

if exist node_modules\express (
    echo ✅ express
) else (
    echo ❌ express (NO instalado)
)

if exist node_modules\dotenv (
    echo ✅ dotenv
) else (
    echo ❌ dotenv (NO instalado)
)

if exist node_modules\axios (
    echo ✅ axios
) else (
    echo ❌ axios (NO instalado)
)

if exist node_modules\cors (
    echo ✅ cors
) else (
    echo ❌ cors (NO instalado)
)

if exist node_modules\body-parser (
    echo ✅ body-parser
) else (
    echo ❌ body-parser (NO instalado)
)

echo.
echo ╔════════════════════════════════════════════════════════════════════════╗

if %found% equ %count% (
    echo ║  ✅ TODAS LAS VERIFICACIONES PASARON                               ║
) else (
    echo ║  ⚠️  ALGUNAS VERIFICACIONES FALLARON                               ║
)

echo ║                                                                        ║
echo ║  Próximos pasos:                                                      ║
echo ║  1. Edita .env con tus credenciales                                   ║
echo ║  2. Ejecuta: INICIAR.bat                                              ║
echo ║                                                                        ║
echo ╚════════════════════════════════════════════════════════════════════════╝

echo.
pause
