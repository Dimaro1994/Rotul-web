# 🤖 Email Bot - LISTO PARA USAR

## ✅ Estado: CONFIGURADO Y ACTIVO

El bot está **corriendo en puerto 3001** y:
- ✅ Recibe correos automáticamente
- ✅ Responde automáticamente cada correo recibido
- ✅ Almacena correos en memoria
- ✅ Expone APIs REST

## 🚀 Iniciar el Bot

```bash
npm run email-bot
```

O para ejecutar todo junto (backend + bot + frontend):

```bash
npm run start:all
```

## 📬 ¿Cómo funciona?

Cuando alguien envíe un correo a **rotulmon@gmail.com**:

1. ✅ El bot recibe el correo
2. ✅ El bot responde automáticamente: "Gracias por tu correo. He recibido tu mensaje..."
3. ✅ El correo se almacena en la API

## 📡 APIs Disponibles

### 1. Enviar correo
```bash
curl -X POST http://localhost:3001/api/send-email \
  -H "Content-Type: application/json" \
  -d '{
    "to": "alguien@gmail.com",
    "subject": "Hola",
    "text": "Mensaje de prueba"
  }'
```

### 2. Ver correos recibidos
```bash
curl http://localhost:3001/api/emails
```

### 3. Limpiar correos
```bash
curl -X DELETE http://localhost:3001/api/emails
```

## 🔧 Configuración

El archivo `.env` contiene:
- Email: rotulmon@gmail.com
- Host IMAP: imap.gmail.com
- Host SMTP: smtp.gmail.com
- Puerto: 3001

## 🎯 Próximos pasos

- Conectar base de datos para guardar correos permanentemente
- Personalizar mensajes de respuesta automática
- Agregar filtros por asunto/remitente
- Integrar con tu aplicación web

---

**Bot creado exitosamente** ✨
