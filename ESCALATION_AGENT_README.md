# 🚀 ESCALATION AGENT - Agente de Escalonamiento

Sistema automático que detecta clientes confusos o inactivos después de contactarlos, y les ofrece contacto directo vía WhatsApp o llamada telefónica.

## 📋 ¿Cómo Funciona?

### Flujo Automático:
1. **Búsqueda** → El agente busca empresas (searchAgent.js)
2. **Contacto** → Envía email inicial 
3. **Monitoreo** → Espera respuesta del cliente
4. **Detección** → Si pasan 24h sin respuesta, cliente está "confuso"
5. **Escalonamiento** → Envía email con opciones de contacto directo (WhatsApp/Llamada)

## ⚙️ Configuración

Agregar al `.env`:

```env
# Teléfono de negocio para contacto directo
BUSINESS_PHONE=34611223344

# O usar variables individuales
WHATSAPP_PHONE=34611223344
CALL_PHONE=34611223344
```

## 🎯 Funcionalidades

✅ Detecta clientes sin respuesta tras 24 horas  
✅ Envía email con botones de WhatsApp y Llamada  
✅ Registra todas las interacciones (logs)  
✅ API para controlar escalonamiento manual  
✅ Dashboard en tiempo real con estadísticas  
✅ CLI para ejecutar procesos manualmente  

## 📡 API REST

### Escalar leads confusos automáticamente
```bash
POST /api/escalate-leads
```
Respuesta:
```json
{
  "success": true,
  "message": "5 leads escalados",
  "escalated": 5
}
```

### Obtener estadísticas
```bash
GET /api/escalation-stats
```
Respuesta:
```json
{
  "total_leads": 45,
  "contacted": 40,
  "responded": 12,
  "confused": 8,
  "escalated": 5,
  "total_escalation_logs": 125,
  "recent_escalations": [...]
}
```

### Obtener logs de escalonamiento
```bash
GET /api/escalation-logs
```

### Escalar un lead específico
```bash
POST /api/escalate-lead/:company
```

### Marcar lead como respondido
```bash
PUT /api/lead-responded/:company
```

## 🖥️ CLI - Línea de Comandos

### Escalar leads confusos
```bash
node escalationAgentCLI.js escalate
```

### Verificar respuestas
```bash
node escalationAgentCLI.js check-responses
```

### Ver estadísticas
```bash
node escalationAgentCLI.js stats
```

## 📊 Datos Almacenados

**escalation_logs.json** - Registro de todas las interacciones:
```json
[
  {
    "leadId": "Empresa XYZ",
    "email": "info@empresa.com",
    "reason": "inactivity_24h",
    "sentAt": "2024-05-31T10:30:00Z",
    "type": "email_escalation"
  }
]
```

**leads.json** - Se actualiza con campos:
```json
{
  "company": "Empresa XYZ",
  "contacted": true,
  "contacted_at": "2024-05-30T10:00:00Z",
  "responded": false,
  "escalation_sent": true,
  "escalation_sent_at": "2024-05-31T10:30:00Z"
}
```

## 🎨 Email de Escalonamiento

El cliente recibe un email elegante con:
- ✅ Explicación de por qué no tuvo respuesta por email
- ✅ Botones directos de WhatsApp (verde)
- ✅ Botones directos de Llamada (azul)
- ✅ Resumen de servicios
- ✅ Garantía de respuesta rápida

## 🔄 Integración con Otros Agentes

### Con searchAgent.js:
```javascript
import { escalateConfusedLeads } from './escalationAgent.js';

// Después de contactar leads
await escalateConfusedLeads();
```

### Con Dashboard:
```javascript
import { getEscalationStats } from './escalationAgent.js';

const stats = getEscalationStats();
```

## ⏰ Automatización Recomendada

Ejecutar escalonamiento automáticamente cada 24 horas:

```javascript
// En server.js
setInterval(() => {
  escalateConfusedLeads().catch(console.error);
}, 24 * 60 * 60 * 1000); // Cada 24 horas
```

O usar cron jobs:
```bash
# Cada día a las 9:00 AM
0 9 * * * cd /ruta/proyecto && node escalationAgentCLI.js escalate
```

## 📱 Botones Generados

### WhatsApp
- Abre directamente WhatsApp en el número configurado
- Mensaje predefinido: "¡Hola! Vi tu interés en nuestro servicio..."
- Funciona en móvil y escritorio

### Llamada Directa
- Abre la aplicación de teléfono
- Número configurado en `BUSINESS_PHONE`

## 🔐 Privacidad y Cumplimiento

✅ Los clientes pueden contactar voluntariamente  
✅ Sin spam - solo después de 24h de inactividad  
✅ Opción explícita de contacto directo  
✅ Logs auditables de todas las acciones  

## 🚨 Casos de Uso

- **Cliente No Responde**: Después de 24h sin respuesta → Escalar
- **Email Rechazado**: El cliente quiere hablar directamente
- **Múltiples Dudas**: Es más rápido llamar que emails
- **Urgencia**: Necesita respuesta inmediata

## 💡 Próximas Mejoras

- [ ] Detección de palabras clave ("confuso", "no entiendo", etc.)
- [ ] Integración con Twilio para SMS
- [ ] Encuestas de satisfacción vía WhatsApp
- [ ] Seguimiento de llamadas en CRM
- [ ] ML para predecir confusión

---

**Creado para Rotulweb** 🎯
