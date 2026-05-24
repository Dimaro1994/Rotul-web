@echo off
REM Script mejorado de instalación - Sin errores

echo.
echo ╔════════════════════════════════════════════════════════════════════════╗
echo ║                                                                        ║
echo ║           INSTALACIÓN MEJORADA - WhatsApp Integration                 ║
echo ║                                                                        ║
echo ╚════════════════════════════════════════════════════════════════════════╝

cd /d "c:\Users\marin\Desktop\Rotulweb\Rotulweb"

echo.
echo [1/5] Limpiando caché de npm...
call npm cache clean --force

echo.
echo [2/5] Instalando dependencias del backend...
call npm install express --save --legacy-peer-deps
call npm install dotenv --save --legacy-peer-deps
call npm install axios --save --legacy-peer-deps
call npm install cors --save --legacy-peer-deps
call npm install body-parser --save --legacy-peer-deps

echo.
echo [3/5] Instalando herramientas de desarrollo...
call npm install --save-dev concurrently

echo.
echo [4/5] Verificando instalación...

if exist "node_modules\express" (
    echo ✅ express instalado
) else (
    echo ❌ express FALLÓ
)

if exist "node_modules\dotenv" (
    echo ✅ dotenv instalado
) else (
    echo ❌ dotenv FALLÓ
)

if exist "node_modules\axios" (
    echo ✅ axios instalado
) else (
    echo ❌ axios FALLÓ
)

if exist "node_modules\cors" (
    echo ✅ cors instalado
) else (
    echo ❌ cors FALLÓ
)

if exist "node_modules\body-parser" (
    echo ✅ body-parser instalado
) else (
    echo ❌ body-parser FALLÓ
)

if exist "node_modules\concurrently" (
    echo ✅ concurrently instalado
) else (
    echo ⚠️  concurrently NO instalado (opcional)
)

echo.
echo [5/5] Verificando .env...

if exist ".env" (
    echo ✅ Archivo .env existe
) else (
    if exist ".env.example" (
        copy .env.example .env
        echo ✅ Archivo .env creado desde .env.example
    )
)

echo.
echo ╔════════════════════════════════════════════════════════════════════════╗
echo ║                                                                        ║
echo ║                   ✅ INSTALACIÓN COMPLETADA                          ║
echo ║                                                                        ║
echo ╚════════════════════════════════════════════════════════════════════════╝

echo.
echo PRÓXIMOS PASOS:
echo ──────────────────────────────────────────────
echo 1. Edita .env con tus credenciales WhatsApp
echo 2. Ejecuta: node server.js (terminal 1)
echo 3. Ejecuta: npm run dev (terminal 2)
echo.

pause
