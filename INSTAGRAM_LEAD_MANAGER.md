# 📱 Instagram Lead Manager - Guía de Uso

## ¿Qué es?

Un **CRM integrado para gestionar leads de Instagram** de forma manual pero organizada. Te permite:

- 📊 Rastrear seguidores potenciales (leads)
- 💬 Registrar contactos manuales sin violar ToS de Instagram
- 🎯 Calificar leads automáticamente por potencial
- ⏰ Establecer recordatorios de seguimiento
- 🎁 Convertir leads en clientes
- 📈 Ver estadísticas y reportes

## Instalación

Los archivos ya están listos. Solo necesitas:

```bash
# Instalar dependencias (ya está hecho)
npm install

# Ejecutar el CLI interactivo
npm run instagram-lead
```

## Características principales

### 1. **Agregar Leads**
```bash
npm run instagram-lead
# Selecciona opción 2
# Ingresa datos del usuario: @username, seguidores, bio, industria
```

El sistema **calcula automáticamente una puntuación** (0-100) basada en:
- Cantidad de seguidores
- Palabras clave en la bio (negocio, empresa, etc.)
- Si ya te sigue
- Industria (si es de tu sector)

### 2. **Ver Leads Principales**
```bash
npm run instagram-lead
# Selecciona opción 1
```

Muestra los 10 leads con mayor puntuación de oportunidad.

### 3. **Contactar Leads** (Manual)
```bash
npm run instagram-lead
# Selecciona opción 4
# Ingresa username y el mensaje que enviaste
```

El sistema registra:
- Que fue contactado
- Cuándo fue contactado
- Cuántos mensajes le enviaste
- Mejora automáticamente su puntuación

### 4. **Registrar Respuestas**
```bash
npm run instagram-lead
# Selecciona opción 5
# Indica si mostró interés
```

Cambia automáticamente el estado del lead a "warm" si respondió.

### 5. **Establecer Recordatorios**
```bash
npm run instagram-lead
# Selecciona opción 6
# Ingresa días, p.ej: 3 días
# Ingresa el mensaje: "Seguimiento: Enviar propuesta"
```

- Crea un recordatorio para ti
- También genera una tarea en el sistema
- Te notifica cuando llegue la fecha

### 6. **Convertir a Cliente**
```bash
npm run instagram-lead
# Selecciona opción 7
# Llena datos básicos del cliente
```

Automáticamente:
- Crea un nuevo cliente
- Lo vincula con el lead
- Cambia el estado a "convertido"

### 7. **Ver Estadísticas**
```bash
npm run instagram-lead
# Selecciona opción 8
```

Muestra:
- Total de leads
- Convertidos a clientes
- Puntuación promedio
- Desglose por estado
- Leads nuevos esta semana

### 8. **Recordatorios Próximos**
```bash
npm run instagram-lead
# Selecciona opción 9
```

Ver todos los recordatorios de los próximos 7 días.

### 9. **Reporte Diario**
```bash
npm run instagram-lead
# Selecciona opción 10
```

Resumen de:
- Recordatorios de hoy
- Leads nuevos
- Respuestas recibidas
- Estadísticas totales

## API REST

También puedes usar los endpoints HTTP si lo integras en tu app:

### Obtener todos los leads
```bash
GET /api/instagram-leads
```

### Obtener leads por estado
```bash
GET /api/instagram-leads?status=new&limit=20
```

Estados disponibles:
- `new` - Nuevos leads
- `contacted` - Ya contactados
- `interested` - Mostraron interés
- `quoted` - Se les envió cotización
- `converted` - Convertidos a clientes
- `rejected` - Rechazaron

### Obtener top leads
```bash
GET /api/instagram-leads/top/leads
```

### Obtener estadísticas
```bash
GET /api/instagram-leads/stats/summary
```

### Agregar nuevo lead
```bash
POST /api/instagram-leads
Content-Type: application/json

{
  "instagramUsername": "usuario123",
  "followerCount": 5000,
  "bio": "Dueño de tienda online",
  "industry": "e-commerce",
  "isFollower": true,
  "notes": "Contactar después"
}
```

### Marcar como contactado
```bash
POST /api/instagram-leads/:id/contacted
Content-Type: application/json

{
  "message": "Mensaje que enviaste"
}
```

### Registrar respuesta
```bash
POST /api/instagram-leads/:id/response
Content-Type: application/json

{
  "isInterested": true
}
```

### Establecer recordatorio
```bash
POST /api/instagram-leads/:id/reminder
Content-Type: application/json

{
  "reminderDate": "2026-06-15",
  "message": "Seguimiento: Propuesta pendiente"
}
```

### Convertir a cliente
```bash
POST /api/instagram-leads/:id/convert
Content-Type: application/json

{
  "companyName": "Mi Empresa",
  "contactName": "Juan Pérez",
  "email": "juan@example.com",
  "phone": "555-1234",
  "projectType": "website",
  "projectDescription": "Quiere un sitio web",
  "budget": 5000
}
```

## Flujo de trabajo recomendado

1. **Recibe mensajes en Instagram** → Ve quién te sigue
2. **Agrega al sistema** (`npm run instagram-lead` → opción 2)
3. **Revisa puntuaciones** → Enfócate en los TOP leads (opción 1)
4. **Contacta manualmente** → Por DM de Instagram
5. **Registra contacto** (`npm run instagram-lead` → opción 4)
6. **Espera respuesta**
7. **Si responde** → Registra (`npm run instagram-lead` → opción 5)
8. **Establece seguimiento** (`npm run instagram-lead` → opción 6)
9. **Cuando esté listo** → Convierte a cliente (`npm run instagram-lead` → opción 7)

## Estados de Leads

```
new → contacted → interested → quoted → converted
         ↓
      (sin respuesta)
         ↓
      rejected/inactive
```

## Puntuación de Lead

```
Seguidores:
  > 1000 = +20 pts
  > 500  = +15 pts
  > 100  = +10 pts

Bio con palabras clave = +25 pts
Es tu follower = +15 pts
Industria target = +20 pts

Total máximo = 100 pts
```

## ¿Cómo es diferente de bots?

✅ **Legal y ético:**
- TÚ envías los mensajes manualmente
- El sistema solo registra y organiza
- No hay automatización de DMs
- No hay follow/unfollow automático
- Cumple 100% con ToS de Instagram

❌ **No es:**
- Un bot que envía mensajes
- Un script de follow/unfollow
- Una herramienta de growth hacking
- Un sistema de spam

## Próximas mejoras

- Integración con Instagram Business API (cuando lo autorice)
- Panel web para gestionar leads
- Notificaciones en tiempo real
- Plantillas de mensajes
- Análisis de conversión
- Exportar datos a CSV

## Soporte

Para problemas:

1. Verifica que MongoDB esté corriendo
2. Revisa el .env tiene `MONGODB_URI`
3. Mira el documento: INSTAGRAM_LEAD_SETUP.md

¡Listo para gestionar tus leads de Instagram de forma profesional! 🚀
