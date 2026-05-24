# 🚀 Guía Completa: Agente WhatsApp para Rotulweb

## 📋 Resumen

Has creado un sistema de chat bidireccional con WhatsApp que incluye:
- ✅ Backend Express con webhooks
- ✅ Widget de chat React
- ✅ Integración con WhatsApp Business API
- ✅ Estilos modernos y responsive

---

## ⚙️ CONFIGURACIÓN INICIAL

### 1️⃣ Instalar dependencias del backend

```bash
npm install express dotenv axios cors body-parser
```

### 2️⃣ Crear archivo .env

Copia `.env.example` a `.env`:

```bash
cp .env.example .env
```

Completa con tus credenciales de WhatsApp:

```env
PORT=5000
WHATSAPP_PHONE_NUMBER_ID=1234567890
WHATSAPP_BUSINESS_ACCOUNT_ID=1234567890
WHATSAPP_ACCESS_TOKEN=your_token_here
WHATSAPP_WEBHOOK_VERIFY_TOKEN=secure_random_string
MONGODB_URI=mongodb://localhost:27017/rotulweb
NODE_ENV=development
```

### 3️⃣ Instalar concurrently (opcional, para ejecutar ambos servidores)

```bash
npm install --save-dev concurrently
```

---

## 🎯 Estructura de archivos creados

```
Rotulweb/
├── server.js                    # Servidor Express principal
├── whatsappController.js        # Controladores de WhatsApp
├── whatsappRoutes.js            # Rutas del API
├── .env.example                 # Variables de entorno (ejemplo)
├── src/
│   ├── WhatsAppWidget.jsx       # Componente React del chat
│   ├── WhatsAppWidget.css       # Estilos del widget
│   └── ... (archivos existentes)
├── BACKEND_SETUP.md             # Guía de setup del backend
└── WIDGET_INTEGRATION.md        # Guía de integración del widget
```

---

## 🚀 INICIAR LA APLICACIÓN

### Opción 1: Servidores separados

**Terminal 1 - Backend:**
```bash
node server.js
```
Debería mostrar: `✅ Server running on http://localhost:5000`

**Terminal 2 - Frontend:**
```bash
npm run dev
```
Debería abrir: `http://localhost:5173`

### Opción 2: Ambos servidores juntos

```bash
npm run dev:full
```

---

## 🔧 PRÓXIMOS PASOS IMPORTANTES

### 1. Validar que el backend funciona

```bash
curl http://localhost:5000/health
```

Respuesta esperada:
```json
{
  "status": "OK",
  "message": "WhatsApp integration server running"
}
```

### 2. Configurar webhooks en WhatsApp Business

Accede a [Meta App Dashboard](https://developers.facebook.com):

1. Selecciona tu aplicación
2. Ve a **Webhooks**
3. Configura:
   - **URL del webhook:** `https://tu-dominio.com/api/whatsapp/webhook`
   - **Verify Token:** El valor de `WHATSAPP_WEBHOOK_VERIFY_TOKEN` en .env
   - **Eventos a suscribirse:** `messages`, `message_status`

### 3. Obtener tus credenciales de WhatsApp

1. Ve a [Meta App Dashboard](https://developers.facebook.com)
2. Selecciona tu app → **Settings** → **Basic**
3. Copiar:
   - `WHATSAPP_ACCESS_TOKEN` (desde Tokens)
   - `WHATSAPP_PHONE_NUMBER_ID` (desde tu número de teléfono registrado)
   - `WHATSAPP_BUSINESS_ACCOUNT_ID` (desde Business Account)

---

## 📝 USAR EL WIDGET

En tu componente principal (`App.jsx`):

```jsx
import WhatsAppWidget from './WhatsAppWidget';

export default function App() {
  return (
    <div>
      {/* Tu contenido */}
      <WhatsAppWidget /> {/* Agregar el widget aquí */}
    </div>
  );
}
```

---

## 🔒 SEGURIDAD

### ✅ Validación de Webhooks

El backend valida cada webhook con:
- Verificación de token en GET
- Validación de firma SHA256 en POST

### ✅ Variables de entorno

Nunca commits tokens en código. Usa `.env`:

```bash
# NUNCA hagas esto:
const token = "abc123xyz";

# En su lugar, usa:
const token = process.env.WHATSAPP_ACCESS_TOKEN;
```

### ✅ CORS configurado

El backend solo acepta requests desde:
- `http://localhost:5173` (desarrollo)
- Tu dominio en producción

---

## 🧪 TESTING

### Enviar un mensaje de prueba

```bash
curl -X POST http://localhost:5000/api/whatsapp/send \
  -H "Content-Type: application/json" \
  -d '{
    "phone_number": "5491234567890",
    "message_text": "Hola desde mi API"
  }'
```

Respuesta esperada:
```json
{
  "success": true,
  "message_id": "wamid.xxx"
}
```

### Ver logs del backend

El servidor mostrará:
```
✅ Mensaje enviado: {...}
📨 Mensaje recibido de 5491234567890: Hola
```

---

## 📊 Endpoints del API

| Método | Endpoint | Descripción |
|--------|----------|-------------|
| GET | `/health` | Health check |
| GET | `/api/whatsapp/webhook` | Verificar webhook |
| POST | `/api/whatsapp/webhook` | Recibir mensajes |
| POST | `/api/whatsapp/send` | Enviar mensaje |
| GET | `/api/whatsapp/conversations/:chatId` | Historial (pendiente) |

---

## ⚠️ SOLUCIÓN DE PROBLEMAS

### Error: "Cannot find module 'express'"
```bash
npm install express
```

### Error: "Port 5000 already in use"
```bash
# Cambiar puerto en .env
PORT=5001
```

### Error: "Invalid webhook verify token"
- Verifica que `WHATSAPP_WEBHOOK_VERIFY_TOKEN` en .env coincida con WhatsApp Dashboard

### Error: "Access token expired"
- Regenera el token en Meta App Dashboard
- Actualiza en `.env`

### Widget no envía mensajes
1. Verifica que el backend esté corriendo
2. Abre DevTools (F12) → Console
3. Busca errores de CORS o conexión
4. Verifica el formato del número: `+CODIGO_PAIS_NUMERO`

---

## 🎨 Personalización

### Cambiar color del widget
En `WhatsAppWidget.css`, reemplaza:
```css
/* De: */
background: linear-gradient(135deg, #25d366 0%, #1fa857 100%);

/* A: */
background: linear-gradient(135deg, #YOUR_COLOR 0%, #YOUR_COLOR_DARK 100%);
```

### Cambiar posición
En `WhatsAppWidget.css`:
```css
.whatsapp-button {
  bottom: 20px;  /* Ajusta aquí */
  right: 20px;   /* Ajusta aquí */
}
```

---

## 🚀 PRÓXIMAS FASES

Para mejorar el agente:

1. **Base de datos** - Guardar conversaciones en MongoDB
2. **Respuestas automáticas** - Usar IA para responder
3. **Asignación de agentes** - Enrutar a equipo correcto
4. **Historial** - Ver conversaciones previas
5. **Notificaciones** - Alertar cuando hay mensajes nuevos
6. **Análisis** - Dashboard de métricas

---

## 📞 SOPORTE

Si necesitas ayuda:

1. Revisa los logs del backend: `node server.js`
2. Abre DevTools en el navegador (F12)
3. Verifica tu conexión de internet
4. Confirma que los puertos estén disponibles

---

**¡Tu agente de WhatsApp está listo! 🎉**

Ahora puedes:
1. Recibir mensajes de clientes
2. Enviar respuestas automáticas
3. Integrar en tu flujo de atención al cliente
