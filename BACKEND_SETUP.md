# 🚀 Instalación del Backend - WhatsApp Integration

## Paso 1: Instalar dependencias

```bash
npm install express dotenv axios cors body-parser
```

## Paso 2: Crear estructura de carpetas

```
backend/
├── server.js                 (archivo ya creado)
├── controllers/
│   └── whatsappController.js
├── middleware/
│   └── webhookValidator.js
├── routes/
│   └── whatsapp.js
├── models/
│   ├── Chat.js
│   └── Message.js
└── config/
    └── database.js
```

## Paso 3: Copiar archivos

Los archivos necesarios están listos para copiar. Asegúrate de:

1. Crear la carpeta `backend` en la raíz del proyecto
2. Copiar `server.js` a la raíz del proyecto
3. Crear las subcarpetas dentro de `backend/`
4. Copiar los controladores y middleware

## Paso 4: Configurar .env

```bash
cp .env.example .env
```

Luego editar `.env` con tus credenciales de WhatsApp Business API:
- `WHATSAPP_PHONE_NUMBER_ID`: Tu número de teléfono ID
- `WHATSAPP_ACCESS_TOKEN`: Tu token de acceso
- `WHATSAPP_WEBHOOK_VERIFY_TOKEN`: Token seguro para verificación

## Paso 5: Ejecutar servidor

```bash
node server.js
```

Deberías ver:
```
✅ Server running on http://localhost:5000
```

## Webhooks a configurar en WhatsApp

URL: `https://tu-dominio.com/api/whatsapp/webhook`
Verify Token: El valor de `WHATSAPP_WEBHOOK_VERIFY_TOKEN` en .env
