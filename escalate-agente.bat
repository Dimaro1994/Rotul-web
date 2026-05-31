@echo off
REM Escalation Agent CLI para Windows

setlocal enabledelayedexpansion

if "%1"=="" (
    echo.
    echo 🚀 ESCALATION AGENT - Herramienta de Linea de Comandos
    echo.
    echo Comandos disponibles:
    echo.
    echo   escalate-leads      Buscar clientes confusos y enviar emails
    echo   check-responses     Verificar respuestas de clientes
    echo   stats               Mostrar estadisticas
    echo   help                Mostrar esta ayuda
    echo.
    echo Ejemplos:
    echo   escalate-agente.bat escalate-leads
    echo   escalate-agente.bat stats
    echo.
    exit /b 0
)

if "%1"=="escalate-leads" (
    echo.
    echo 📤 Iniciando escalonamiento de leads confusos...
    echo.
    node escalationAgentCLI.js escalate
    goto end
)

if "%1"=="check-responses" (
    echo.
    echo 📧 Verificando respuestas de clientes...
    echo.
    node escalationAgentCLI.js check-responses
    goto end
)

if "%1"=="stats" (
    echo.
    echo 📊 Estadisticas de escalonamiento:
    echo.
    node escalationAgentCLI.js stats
    goto end
)

if "%1"=="help" (
    node escalationAgentCLI.js help
    goto end
)

echo ❌ Comando desconocido: %1
echo Usa "escalate-agente.bat help" para ver los comandos disponibles

:end
pause
