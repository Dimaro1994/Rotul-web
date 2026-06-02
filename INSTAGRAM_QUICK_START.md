# 🚀 INSTAGRAM LEAD MANAGER - QUICK START

## Inicio en 5 minutos

### Paso 1: Verificar que todo esté instalado
```bash
# Ya está hecho, pero puedes verificar:
cd Rotulweb
npm install  # Si falta algo
```

### Paso 2: Ejecutar el CLI
```bash
npm run instagram-lead
```

### Paso 3: Menú interactivo
```
📱 GESTOR DE LEADS INSTAGRAM
================================
1. Ver leads principales
2. Agregar nuevo lead         ← EMPIEZA AQUÍ
3. Ver leads por estado
4. Contactar lead
5. Registrar respuesta
6. Establecer recordatorio
7. Convertir a cliente
8. Ver estadísticas
9. Ver recordatorios próximos
10. Reporte diario
0. Salir
```

## Ejemplo: Agregar tu primer lead

```
Selecciona opción: 2

➕ AGREGAR NUEVO LEAD

Usuario de Instagram: @juan_diseño
Cantidad de seguidores: 3500
Cantidad que sigue: 450
Bio (o descripción): Dueño de agencia de diseño digital
Industria (opcional): diseño
¿Es tu follower? (s/n): s
Notas (opcional): Vio mis historias hace 2 días

✅ Lead agregado exitosamente
Puntuación asignada: 85
```

## Ejemplo: Buscar leads para contactar

```
Selecciona opción: 1

🔝 TOP LEADS (Por puntuación)

│ Usuario        │ Puntuación │ Estado    │ Seguidores │ Interacciones │
├─────────────────┼────────────┼───────────┼────────────┼───────────────┤
│ @juan_diseño    │ 85         │ new       │ 3500       │ 0             │
│ @maria_store    │ 72         │ new       │ 2100       │ 0             │
│ @carlos_web     │ 68         │ new       │ 1800       │ 0             │

→ Enfócate en estos primero
```

## Ejemplo: Registrar que contactaste

```
Selecciona opción: 4

💬 MARCAR COMO CONTACTADO

Usuario de Instagram: @juan_diseño
Mensaje enviado: Hola Juan! Vi que trabajas en diseño, te gustaría hablar de proyectos web?

✅ Contacto registrado
```

## Ejemplo: Cuando responde

```
Selecciona opción: 5

💌 REGISTRAR RESPUESTA

Usuario de Instagram: @juan_diseño
¿Mostró interés? (s/n): s

✅ Respuesta registrada
```

## Ejemplo: Establecer seguimiento

```
Selecciona opción: 6

⏰ ESTABLECER RECORDATORIO

Usuario de Instagram: @juan_diseño
Días desde hoy: 3
Mensaje del recordatorio: Enviar cotización para el proyecto web

✅ Recordatorio establecido para 2026-06-05
```

## Ver tu progreso diario

```
Selecciona opción: 10

📅 REPORTE DIARIO

Fecha: 2026-06-02

📌 Recordatorios de hoy: 2
  • @juan_diseño: Enviar cotización
  • @maria_store: Seguimiento de presupuesto

➕ Leads nuevos hoy: 3

💬 Respuestas recibidas hoy: 1

📊 Estadísticas totales:
  Total de leads: 12
  Convertidos: 1
```

## Integración con Clientes

Cuando un lead está listo:

```
Selecciona opción: 7

🎯 CONVERTIR A CLIENTE

Usuario de Instagram: @juan_diseño
Nombre de empresa: Agencia de Diseño Digital
Nombre de contacto: Juan Pérez
Email: juan@agenciadigital.com
Teléfono: +34-555-1234
Tipo de proyecto (website/design/both): website
Descripción del proyecto: Rediseño de sitio web corporativo
Presupuesto: 8500

✅ Lead convertido a cliente
ID del cliente: 507f1f77bcf36cd799439011
```

## Comandos útiles

```bash
# Ver leads principales
npm run instagram-lead

# Ver API health
curl http://localhost:5000/health

# Ver estadísticas por API
curl http://localhost:5000/api/instagram-leads/stats/summary

# Ver leads nuevos
curl http://localhost:5000/api/instagram-leads?status=new
```

## Datos que se rastrean

Por cada lead guardas:
- Username
- Seguidores
- Bio
- Industria
- Fecha de seguimiento
- Mensajes enviados
- Respuestas recibidas
- Estado actual
- Puntuación
- Notas personalizadas

## Próximo paso

1. **Abre otra terminal** y ejecuta:
   ```bash
   npm run backend
   ```
   Esto inicia el servidor API en `http://localhost:5000`

2. **Luego ejecuta** (en otra terminal):
   ```bash
   npm run instagram-lead
   ```

3. **Empieza a agregar leads y hacer seguimiento**

## Archivos creados

```
/models/InstagramLead.js          ← Modelo de datos
/instagramLeadAgent.js            ← Lógica del agente
/instagramLeadCLI.js              ← Interfaz de línea de comandos
/routes/instagramLeads.js         ← API REST
/INSTAGRAM_LEAD_MANAGER.md        ← Documentación completa
```

## Limitaciones (a propósito)

❌ No envía mensajes automáticos  
❌ No tiene bot de seguimiento  
❌ No es un growth hack  

✅ Es un organizador de leads  
✅ Registro manual de contactos  
✅ Seguimiento profesional  

## Ayuda

Si algo no funciona:

```bash
# Revisar que MongoDB esté corriendo
# Revisar que el .env tenga la conexión

# Ver logs
npm run instagram-lead
```

¡Listo! 🎉 Ahora gestiona tus leads de Instagram de forma profesional.
