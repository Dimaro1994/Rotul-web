# 🤖 AGENTE AUTOMÁTICO - HORARIO DE TRABAJO

## ⏰ Configuración

El agente está configurado para trabajar:
- **Lunes a Viernes**: 8:00 AM - 8:00 PM
- **Sábado y Domingo**: CERRADO (descanso)

---

## 🚀 OPCIÓN 1: Ejecutar Manualmente (Más Simple)

### Pasos:

1. **Abre la carpeta del proyecto**
   - `c:\Users\marin\Desktop\Rotulweb\Rotulweb`

2. **Haz doble clic en:**
   - `iniciar-agente-automatico.bat`

3. **Listo!**
   - El sistema se iniciará/detendrá automáticamente según la hora

---

## 🔄 OPCIÓN 2: Ejecutar Automáticamente al Iniciar Windows (Recomendado)

### Configurar Windows Task Scheduler:

#### Paso 1: Abrir Task Scheduler
1. Presiona `Win + R`
2. Escribe `taskschd.msc`
3. Presiona Enter

#### Paso 2: Crear Nueva Tarea
1. En el panel izquierdo, haz clic en **"Create Task"**
2. En la pestaña **"General"**:
   - Nombre: `RotulwebAgenteAutomatico`
   - Descripción: `Agente de gestión de clientes - Inicia 8am-8pm L-V`
   - Marca: "Run with highest privileges"

#### Paso 3: Configurar Activador (Trigger)
1. Ve a pestaña **"Triggers"**
2. Haz clic en **"New..."**
3. Elige **"On a schedule"**
4. Selecciona **"Daily"**
5. En "Start time": `8:00 AM`
6. En "Recur every": `1 day`
7. Haz clic en **"Advanced settings"**:
   - Marca: "Repeat task every: 1 day"
   - Duration: "for a duration of: 12 hours"
   - Marca: "Stop task if it runs longer than: 13 hours"
8. Haz clic **OK**

#### Paso 4: Crear Segundo Trigger (Detener a las 8pm)
1. Haz clic en **"New..."** nuevamente
2. Elige **"On a schedule"**
3. Selecciona **"Daily"**
4. En "Start time": `8:00 PM`
5. Haz clic en **"Advanced settings"**:
   - Marca: "Delete the task if it is not scheduled to run again"
6. Haz clic **OK**

#### Paso 5: Configurar Acción (Action)
1. Ve a pestaña **"Actions"**
2. Haz clic en **"New..."**
3. En "Program/script":
   ```
   C:\Windows\System32\cmd.exe
   ```
4. En "Add arguments":
   ```
   /c C:\Users\marin\Desktop\Rotulweb\Rotulweb\iniciar-agente-automatico.bat
   ```
5. En "Start in":
   ```
   C:\Users\marin\Desktop\Rotulweb\Rotulweb
   ```
6. Haz clic **OK**

#### Paso 6: Configurar Condiciones (Conditions)
1. Ve a pestaña **"Conditions"**
2. Marca: "Wake the computer to run this task"

#### Paso 7: Guardar
1. Haz clic **OK**
2. Ingresa tu contraseña si se pide

---

## 🔍 Cómo Funciona

### Durante el Horario de Trabajo (8am-8pm, L-V):
```
✅ Backend corriendo en puerto 5000
✅ Bot de Email corriendo en puerto 3001
✅ Frontend accesible en http://localhost:5173
✅ Dashboard disponible en http://localhost:5173?admin=dashboard
```

### Fuera del Horario / Sábado y Domingo:
```
❌ Backend detenido
❌ Bot de Email detenido
❌ Frontend detenido
💾 Datos guardados en MongoDB
```

---

## 📊 Monitoreo

Cuando ejecutes `iniciar-agente-automatico.bat`, verás:

```
╔════════════════════════════════════════════════════════╗
║  AGENTE AUTOMÁTICO - Sistema de Gestión Clientes      ║
╚════════════════════════════════════════════════════════╝

📅 HORARIO DE TRABAJO:
   Lunes a Viernes: 8:00 AM - 8:00 PM
   Sábado y Domingo: CERRADO

⏱️  PRÓXIMAS ACCIONES:
   ✅ Cada lunes a viernes a las 8:00 AM → INICIA
   ✅ Cada lunes a viernes a las 8:00 PM → DETIENE
   ✅ Sábado y domingo → DESCANSO

📍 ESTADO ACTUAL:
   ✅ ABIERTO - Sistema en funcionamiento
```

---

## 🔧 Solucionar Problemas

### ❌ "El agente no inicia a las 8am"
- Verifica que Windows Task Scheduler está habilitado
- Abre Services (services.msc) y busca "Task Scheduler"
- Asegúrate de que está "Running"

### ❌ "El agente no se detiene a las 8pm"
- Crea un segundo trigger para las 8pm
- Usa `taskkill` para terminar los procesos manualmente

### ❌ "Dice que MongoDB no conecta"
- Verifica que MongoDB también está corriendo con horario
- Crea otra tarea para MongoDB (si usas MongoDB local)

### ❌ "Los datos se pierden"
- Los datos se guardan en MongoDB, no se pierden
- Solo se detiene la interfaz y los servicios

---

## ⚙️ Script Personalizado (Alternativa)

Si quieres horarios diferentes, edita `agenteAutomatico.js`:

```javascript
// Cambia estas líneas:
if (hour >= 8 && hour < 20) {  // 8am a 8pm
  return true;
}
```

Por ejemplo, para 7am a 9pm:
```javascript
if (hour >= 7 && hour < 21) {  // 7am a 9pm
  return true;
}
```

---

## 🎯 Casos de Uso

### Opción 1: Solo durante horas de oficina
- Usar el batch file que se ejecuta manualmente

### Opción 2: Automático todos los días
- Configurar en Windows Task Scheduler
- Se inicia/detiene solo

### Opción 3: 24/7 (Siempre corriendo)
```bash
npm run start:all
```

---

## 📱 Avisos

El agente enviará:
- ✉️ Email al crear cliente
- ✉️ Email al cambiar estado
- ✉️ Email de recordatorio de plazo

Solo durante el horario de trabajo L-V 8am-8pm.

---

## 🎉 ¡Listo!

Ahora tu agente trabaja según tu horario:

**Para empezar hoy:**
```
Haz doble clic en: iniciar-agente-automatico.bat
```

**Para automatizarlo permanentemente:**
1. Sigue los pasos de "OPCIÓN 2" arriba
2. El agente se iniciará solo cada día

---

**Presiona Ctrl+C en cualquier momento para detener el monitor.**
