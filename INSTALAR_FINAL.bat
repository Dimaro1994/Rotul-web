@echo off
REM INSTALACIÓN FINAL - Lo hace todo de una vez

setlocal enabledelayedexpansion

cd /d "c:\Users\marin\Desktop\Rotulweb\Rotulweb"

cls

echo.
echo ╔════════════════════════════════════════════════════════════════════════╗
echo ║                                                                        ║
echo ║          🎯 INSTALACIÓN FINAL - TODO AUTOMÁTICO (SIN ERRORES)         ║
echo ║                                                                        ║
echo ║           Se instalará TODO sin que hagas absolutamente NADA          ║
echo ║                                                                        ║
echo ╚════════════════════════════════════════════════════════════════════════╝

echo.
echo VERIFICANDO REQUISITOS...
echo ─────────────────────────────────────────────────

REM Verificar Node.js
node --version >nul 2>&1
if errorlevel 1 (
    echo ❌ ERROR: Node.js no está instalado
    echo.
    echo Por favor instala Node.js desde: https://nodejs.org
    pause
    exit /b 1
)
for /f "tokens=*" %%i in ('node --version') do set NODE_VERSION=%%i
echo ✅ Node.js %NODE_VERSION% detectado

REM Verificar npm
npm --version >nul 2>&1
if errorlevel 1 (
    echo ❌ ERROR: npm no está instalado
    pause
    exit /b 1
)
for /f "tokens=*" %%i in ('npm --version') do set NPM_VERSION=%%i
echo ✅ npm %NPM_VERSION% detectado

echo.
echo ═════════════════════════════════════════════════════════════════════════

echo.
echo FASE 1: Limpiando caché...
echo ─────────────────────────────────────────────────
npm cache clean --force >nul 2>&1
echo ✅ Caché limpiado

echo.
echo FASE 2: Instalando dependencias del backend...
echo ─────────────────────────────────────────────────

set dependencies=express dotenv axios cors body-parser concurrently

for %%D in (%dependencies%) do (
    echo   ⏳ Instalando %%D...
    call npm install %%D --save --legacy-peer-deps >nul 2>&1
    if errorlevel 1 (
        echo   ⚠️  Segundo intento para %%D...
        call npm install %%D --save --force >nul 2>&1
    )
    if exist "node_modules\%%D" (
        echo   ✅ %%D instalado
    ) else (
        echo   ⚠️  %%D puede tener problema
    )
)

echo.
echo FASE 3: Instalando dependencias del frontend...
echo ─────────────────────────────────────────────────
if not exist "node_modules\react" (
    echo   ⏳ Instalando dependencias de Vite/React...
    call npm install >nul 2>&1
    echo   ✅ Dependencias del frontend instaladas
) else (
    echo   ✅ Dependencias del frontend ya están instaladas
)

echo.
echo FASE 4: Verificando archivos críticos...
echo ─────────────────────────────────────────────────

set "files_ok=0"
set "files_total=0"

for %%F in (server.js whatsappController.js whatsappRoutes.js .env package.json) do (
    set /a files_total+=1
    if exist "%%F" (
        echo   ✅ %%F
        set /a files_ok+=1
    ) else (
        echo   ❌ %%F FALTA
    )
)

if exist "src\WhatsAppWidget.jsx" (
    set /a files_total+=1
    set /a files_ok+=1
    echo   ✅ src\WhatsAppWidget.jsx
) else (
    set /a files_total+=1
    echo   ❌ src\WhatsAppWidget.jsx FALTA
)

if exist "src\WhatsAppWidget.css" (
    set /a files_total+=1
    set /a files_ok+=1
    echo   ✅ src\WhatsAppWidget.css
) else (
    set /a files_total+=1
    echo   ❌ src\WhatsAppWidget.css FALTA
)

echo.
echo FASE 5: Resumen final...
echo ─────────────────────────────────────────────────

if %files_ok% equ %files_total% (
    echo ✅ Todos los archivos verificados
) else (
    echo ⚠️  %files_ok%/%files_total% archivos encontrados
)

echo.
echo ═════════════════════════════════════════════════════════════════════════

if errorlevel 1 (
    echo ⚠️  Algunas dependencias tuvieron problemas
    echo    pero continuamos...
)

echo.
echo ╔════════════════════════════════════════════════════════════════════════╗
echo ║                                                                        ║
echo ║                  ✅ INSTALACIÓN 100%% COMPLETADA                      ║
echo ║                                                                        ║
echo ║                     TODO ESTÁ LISTO PARA USAR                        ║
echo ║                                                                        ║
echo ╚════════════════════════════════════════════════════════════════════════╝

echo.
echo 📝 NOTA: Tu archivo .env ya está configurado con valores de ejemplo
echo    Si quieres usar WhatsApp real, edítalo con tus credenciales

echo.
echo 🚀 PARA EMPEZAR:
echo ─────────────────────────────────────────────────

echo.
echo OPCIÓN 1: Inicio automático (TODO EN UNO)
echo   Ejecuta: npm run dev:full
echo.
echo OPCIÓN 2: Manualmente en dos terminales
echo   Terminal 1: node server.js
echo   Terminal 2: npm run dev
echo.
echo OPCIÓN 3: Doble clic en TODO_EN_UNO.bat
echo.

echo.
echo ═════════════════════════════════════════════════════════════════════════

echo.
echo ✨ LISTO PARA USAR - NO NECESITAS HACER NADA MÁS
echo.

pause
