# 🚀 ESCALATION AGENT - GUÍA RÁPIDA

## ¿Qué es?

Agente automático que detecta clientes confusos o sin respuesta, y les ofrece contacto directo vía **WhatsApp** o **Llamada Telefónica**.

## Instalación (5 minutos)

### 1. Configurar `.env`

Edita el archivo `.env` y actualiza:

```env
# Tu número de teléfono para contacto
BUSINESS_PHONE=34611223344    ← CAMBIAR POR TU NÚMERO
WHATSAPP_PHONE=34611223344
CALL_PHONE=34611223344
```

### 2. Verificar que está activado en `server.js`

✅ Ya está incluido. Solo ejecuta el servidor.

## Cómo Funciona

```
Búsqueda (searchAgent.js)
         ↓
Email Inicial (24h para responder)
         ↓
Sin Respuesta Después de 24h
         ↓
Escalonamiento Automático (este agente)
         ↓
Email con WhatsApp + Botón de Llamada
         ↓
Cliente Contacta Directamente
```

## Uso Rápido

### Opción 1: Escalar Manualmente (Interfaz)

```bash
# Inicia el servidor
npm start

# Entra a: http://localhost:3000/escalation
# Haz clic en "Escalar Leads Confusos"
```

### Opción 2: Escalar por Línea de Comandos

```bash
# Método 1: Windows - Doble click
escalate-agente.bat escalate-leads

# Método 2: Terminal
node escalationAgentCLI.js escalate
```

### Opción 3: API REST

```bash
# Escalar leads confusos
curl -X POST http://localhost:3001/api/escalate-leads

# Ver estadísticas
curl http://localhost:3001/api/escalation-stats

# Ver logs
curl http://localhost:3001/api/escalation-logs
```

## Email que Recibe el Cliente

El cliente recibe un email elegante con:

✅ Explicación profesional  
✅ **Botón de WhatsApp** (verde) - Click directo a WhatsApp  
✅ **Botón de Llamada** (azul) - Abre aplicación de teléfono  
✅ Resumen de servicios  
✅ Garantía de respuesta rápida  

## Dashboard en Tiempo Real

Accede a: **http://localhost:3000/escalation**

Verás:
- 📊 Total de leads
- 📧 Leads contactados
- ✅ Clientes que respondieron
- ⚠️ Clientes "confusos" (sin respuesta 24h+)
- 🚀 Clientes escalados
- 📝 Log de actividad en tiempo real

## Automatización

### Opción A: Escalar cada día automáticamente

Agregar a `server.js`:

```javascript
import { escalateConfusedLeads } from './escalationAgent.js';

// Cada 24 horas
setInterval(() => {
  console.log('🔄 Ejecutando escalonamiento automático...');
  escalateConfusedLeads().catch(console.error);
}, 24 * 60 * 60 * 1000);
```

### Opción B: Usar Windows Task Scheduler

1. Abre "Programador de Tareas"
2. Crea tarea programada
3. Ejecuta: `escalate-agente.bat escalate-leads`
4. Programa: Cada 24 horas

### Opción C: Cron Job (Linux/Mac)

```bash
# Editar crontab
crontab -e

# Agregar: Cada día a las 9:00 AM
0 9 * * * cd /ruta/proyecto && node escalationAgentCLI.js escalate
```

## Datos Guardados

Se crean dos archivos JSON:

**leads.json**
```json
{
  "company": "Mi Empresa",
  "contacted": true,
  "contacted_at": "2024-05-30T10:00:00Z",
  "responded": false,
  "escalation_sent": true,
  "escalation_sent_at": "2024-05-31T10:30:00Z"
}
```

**escalation_logs.json**
```json
{
  "leadId": "Mi Empresa",
  "email": "info@empresa.com",
  "reason": "inactivity_24h",
  "sentAt": "2024-05-31T10:30:00Z",
  "type": "email_escalation"
}
```

## Ejemplos de Uso

### Caso 1: Cliente Recibió Email pero No Responde

```
Día 1 (10:00 AM) → searchAgent envía email
Día 2 (10:00 AM) → escalationAgent detecta inactividad
          ↓
    Envía email con WhatsApp + Llamada
Día 2 (11:00 AM) → Cliente llama directamente
```

### Caso 2: Múltiples Clientes sin Respuesta

```
Ejecutas: node escalationAgentCLI.js escalate

Resultado:
✅ 7 leads escalados
📧 7 emails enviados con opciones de contacto directo
```

## Estadísticas

Después de ejecutar, verás:

```
📊 Total Leads: 45
📧 Contactados: 40
✅ Respondidos: 12 (30% tasa éxito)
⚠️ Confusos: 8 (sin respuesta 24h+)
🚀 Escalados: 5
```

## Preguntas Frecuentes

### ¿Qué es "cliente confuso"?
Aquél que recibió email pero no respondió después de 24 horas.

### ¿Se le envía spam?
No. Solo un email después de 24h de inactividad, con opción de contacto directo.

### ¿Puedo cambiar el tiempo de 24h?
Sí, edita `escalationAgent.js`, línea ~30:
```javascript
const hoursSinceContact = (now - contactedAt) / (1000 * 60 * 60);
return hoursSinceContact > 24 // ← Cambiar aquí
```

### ¿Se pueden escalar leads manualmente?
Sí, por API:
```bash
POST /api/escalate-lead/NombreEmpresa
```

### ¿Cómo sé qué clientes respondieron?
En dashboard o por API:
```bash
GET /api/escalation-stats
```

## Próximas Mejoras

- [ ] Detectar palabras clave ("confuso", "no entiendo")
- [ ] SMS vía Twilio
- [ ] Encuestas de satisfacción por WhatsApp
- [ ] Seguimiento de llamadas
- [ ] ML para predecir confusión

## Soporte

📧 Email: info@rotulweb  
📱 WhatsApp: 34611223344  
🌐 Web: https://rotulweb.com  

---

**¡Ya está listo! Comienza con:**

```bash
# 1. Actualiza el .env con tu número
# 2. Inicia servidor
npm start

# 3. Escala leads
node escalationAgentCLI.js escalate

# O accede al dashboard
http://localhost:3000/escalation
```

🚀 **¡Bienvenido al Agente de Escalonamiento!**
