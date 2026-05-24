# ❓ Preguntas Frecuentes - WhatsApp Integration

## General

### ¿Qué puedo hacer con este agente?

✅ Recibir mensajes de WhatsApp en tu web
✅ Enviar mensajes automáticos desde tu web
✅ Ver chat bidireccional
✅ Integrar con tu flujo de atención al cliente
✅ Personalizar el widget

### ¿Cuánto cuesta?

- WhatsApp Business API: Requiere cuenta comercial (costo según uso)
- Backend: Tu servidor (nosotros usamos Express, es gratis)
- Frontend: Widget React (totalmente incluido)

### ¿Es seguro?

✅ Sí. Incluye:
- Validación de webhooks con SHA256
- Variables de entorno para secretos
- CORS configurado
- Validación de tokens


## Instalación

### Error: "npm: command not found"

Necesitas instalar Node.js desde: https://nodejs.org

### Error: "Cannot find module 'express'"

```bash
npm install express
```

### ¿Qué pasa si no tengo MongoDB?

El código está preparado para MongoDB, pero si solo quieres enviar/recibir mensajes, no lo necesitas. Para guardar conversaciones:

```bash
# Opción 1: Instalar MongoDB localmente
# Opción 2: Usar MongoDB Atlas (nube): https://www.mongodb.com/atlas

# Luego actualiza .env:
MONGODB_URI=mongodb+srv://user:pass@cluster.mongodb.net/rotulweb
```


## WhatsApp Business API

### ¿Cómo obtengo mis credenciales?

1. Ve a https://developers.facebook.com
2. Crea una app (si no la tienes)
3. Agrega "WhatsApp" a la app
4. Ve a Settings → Basic
5. Copia el Access Token
6. Ve a WhatsApp → Getting Started
7. Copia Phone Number ID y Business Account ID

### ¿Mi número personal sirve?

❌ No. Necesitas:
- Cuenta de negocio (Business Account)
- Número comercial registrado
- Estar aprobado por WhatsApp

### ¿Puedo recibir mensajes de clientes?

✅ Sí, el backend recibe webhooks. Necesitas:
1. Configurar webhooks en Meta Dashboard
2. URL: `https://tu-dominio.com/api/whatsapp/webhook`
3. Verify Token: El de tu .env
4. Subscribirse a eventos: `messages`

### ¿Cuáles son los límites?

- Depende de tu plan con WhatsApp
- Generalmente: mensajes ilimitados
- Velocidad: Según capacidad del servidor


## Widget y Frontend

### ¿Dónde aparece el botón?

En la esquina inferior derecha de la página. Personalizable en `WhatsAppWidget.css`

### ¿Puedo cambiar el color?

✅ Sí. En `WhatsAppWidget.css`:

```css
.whatsapp-button {
  background: linear-gradient(135deg, #TU_COLOR 0%, #TU_COLOR_OSCURO 100%);
}
```

### ¿El widget funciona en móvil?

✅ Sí, está optimizado. Se adapta al tamaño de pantalla.

### ¿Puedo mover el botón?

✅ Sí, en `WhatsAppWidget.css`:

```css
.whatsapp-button {
  bottom: 20px;  /* Arriba/abajo */
  right: 20px;   /* Izq/derecha */
}
```

### ¿Puedo cambiar el tamaño?

✅ Sí, en `WhatsAppWidget.css`:

```css
.whatsapp-widget {
  width: 380px;   /* Ancho */
  height: 600px;  /* Alto */
}
```

### ¿Qué información solicita el widget?

- ✅ Número de teléfono (requerido)
- ✅ Mensaje (requerido)
- ❌ No solicita email ni datos personales


## Backend y Servidor

### ¿En qué puerto corre?

Puerto 5000 (configurable en .env)

### ¿Puedo cambiar el puerto?

✅ Sí:

```env
PORT=3000
```

Luego reinicia: `node server.js`

### ¿Cómo veo los logs?

El terminal donde ejecutas `node server.js` mostrará:

```
✅ Mensaje enviado
📨 Mensaje recibido
❌ Error...
```

### ¿El servidor funciona en producción?

✅ Sí, con estas consideraciones:
- Usa un servidor (Heroku, AWS, DigitalOcean, etc.)
- Usa HTTPS obligatorio para webhooks
- Configura variables de entorno en tu servidor
- Monitorea los logs

### ¿Cómo despliego a producción?

Depende de tu hosting:

**Heroku:**
```bash
heroku create mi-app
git push heroku main
heroku config:set WHATSAPP_ACCESS_TOKEN=...
```

**AWS, DigitalOcean, etc:**
- Sube los archivos
- Instala Node.js
- `npm install` y `node server.js`


## Integración

### ¿Cómo agrego el widget a mi sitio?

1. Copia `WhatsAppWidget.jsx` a `src/components/`
2. En `App.jsx`:

```jsx
import WhatsAppWidget from './components/WhatsAppWidget';

export default function App() {
  return (
    <>
      <YourContent />
      <WhatsAppWidget />
    </>
  );
}
```

### ¿Puedo usar esto en Next.js?

✅ Sí, el widget funciona en Next.js. Asegúrate de que sea un cliente:

```jsx
'use client'; // Si usas App Router

import WhatsAppWidget from '@/components/WhatsAppWidget';

export default function App() {
  return <WhatsAppWidget />;
}
```

### ¿Puedo usar esto en Vue.js?

Parcialmente. El widget está en React, pero puedes:
1. Adaptar el componente a Vue
2. Usar el backend igual (Express funciona con cualquier frontend)

### ¿Puedo usar esto en vanilla JavaScript?

✅ Sí. Necesitarías:
1. Mantener el backend Express igual
2. Crear el widget en HTML/JS/CSS
3. Hacer fetch al backend


## Solución de Problemas

### El widget no aparece

- Verifica que importaste el componente
- Abre DevTools (F12) → Console
- Busca errores de JavaScript

### Los mensajes no se envían

Pasos:
1. Verifica que el backend está corriendo: `node server.js`
2. Abre DevTools → Network
3. Busca la petición POST a `/api/whatsapp/send`
4. ¿Qué status code? 
   - 200: OK
   - 400: Faltan datos (phone_number, message_text)
   - 500: Error del servidor (revisa terminal)

### Error: "CORS error"

El frontend no puede conectar al backend. Solución:

```javascript
// En server.js
app.use(cors({
  origin: ['http://localhost:5173', 'https://tu-dominio.com'],
  credentials: true
}));
```

### Error: "Invalid webhook signature"

La firma SHA256 no coincide. Verifica:

```env
WHATSAPP_ACCESS_TOKEN=EL_CORRECTO
WHATSAPP_WEBHOOK_VERIFY_TOKEN=EL_CORRECTO
```

### Mensaje dice "Mensaje enviado" pero no llega

Posibles causas:
- Número de teléfono incorrecto (debe ser: +CODIGO_PAIS_NUMERO)
- Token de WhatsApp expirado
- Cuenta no aprobada por WhatsApp

### El backend no inicia

```bash
# Error: Port already in use
# Solución: Cambiar puerto en .env

# Error: Cannot find module
# Solución: npm install

# Error: ENOENT: no such file or directory '.env'
# Solución: cp .env.example .env
```


## Mejoras Futuras

### ¿Puedo guardar el historial?

✅ Sí. Necesitas MongoDB:

1. Crear modelos (Chat.js, Message.js)
2. Guardar mensajes en receiveMessage
3. Obtener historial en GET /api/whatsapp/conversations

### ¿Puedo usar IA para responder automáticamente?

✅ Sí. Integra:
- OpenAI GPT
- Google Cloud AI
- Anthropic Claude

### ¿Puedo asignar a agentes?

✅ Sí. Implementa:
- Cola de mensajes
- Sistema de asignación
- Notificaciones a agentes

### ¿Puedo recopilar datos del cliente?

✅ Sí. Puedes:
- Guardar nombre del cliente
- Guardar email
- Crear perfil de cliente
- Rastrear interacciones


═════════════════════════════════════════════════════════════════════════════

¿No encontraste tu respuesta? Revisa:
- QUICK_START.md
- WHATSAPP_SETUP_COMPLETE.md
- BACKEND_SETUP.md
- Consola del navegador (F12)
- Logs del servidor (terminal)
