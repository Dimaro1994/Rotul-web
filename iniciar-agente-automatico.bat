@echo off
REM ================================================
REM  AGENTE DE GESTIÓN DE CLIENTES - MODO AUTOMÁTICO
REM  Ejecuta de 8am a 8pm, lunes a viernes
REM ================================================

setlocal enabledelayedexpansion

echo.
echo ╔════════════════════════════════════════════════════╗
echo ║  AGENTE AUTOMÁTICO - Sistema de Gestión Clientes  ║
echo ╚════════════════════════════════════════════════════╝
echo.
echo 📅 Horario: Lunes a Viernes, 8:00 AM - 8:00 PM
echo.

REM Verificar si Node.js está instalado
node -v >nul 2>&1
if errorlevel 1 (
    echo ❌ ERROR: Node.js no está instalado
    echo.
    echo Descarga Node.js de: https://nodejs.org/
    pause
    exit /b 1
)

REM Verificar si estamos en la carpeta correcta
if not exist "package.json" (
    echo ❌ ERROR: No estás en la carpeta de Rotulweb
    pause
    exit /b 1
)

REM Ejecutar el agente automático
echo ✅ Iniciando monitor de horario...
echo.
node agenteAutomatico.js

pause
