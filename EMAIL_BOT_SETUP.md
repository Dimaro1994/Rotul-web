# 🤖 Email Bot - Guía de Configuración

## Instalación de Dependencias

```bash
npm install
```

## Configuración de Gmail

### 1. Habilitar autenticación de 2 factores
1. Ve a [myaccount.google.com](https://myaccount.google.com)
2. Selecciona "Seguridad" en la izquierda
3. Habilita "Verificación en dos pasos"

### 2. Generar contraseña de aplicación
1. Ve a [myaccount.google.com/apppasswords](https://myaccount.google.com/apppasswords)
2. Selecciona "Mail" y "Windows"
3. Google te generará una contraseña de 16 caracteres
4. **Copia esta contraseña**

### 3. Configurar .env
1. Abre el archivo `.env`
2. Reemplaza `your_app_password_here` con la contraseña que generaste
3. Guarda el archivo

```env
EMAIL_USER=rotulmon@gmail.com
EMAIL_PASSWORD=xxxx xxxx xxxx xxxx  # Tu contraseña de aplicación (16 caracteres)
```

### 4. Habilitar IMAP en Gmail
1. En Gmail, abre Configuración (engranaje)
2. Ve a "Reenvío y correo POP/IMAP"
3. Habilita IMAP
4. Guarda cambios

## Uso del Bot

### Iniciar el bot
```bash
node emailBot.js
```

Deberías ver:
```
🚀 Bot de correo escuchando en puerto 3001
✅ Conectado a Gmail IMAP
✅ IMAP listo para recibir correos
```

### APIs disponibles

#### 1. **Enviar correo**
```bash
curl -X POST http://localhost:3001/api/send-email \
  -H "Content-Type: application/json" \
  -d '{
    "to": "destinatario@gmail.com",
    "subject": "Prueba",
    "text": "Hola, esto es una prueba"
  }'
```

#### 2. **Obtener correos recibidos**
```bash
curl http://localhost:3001/api/emails
```

#### 3. **Limpiar correos almacenados**
```bash
curl -X DELETE http://localhost:3001/api/emails
```

## Características

✅ Envío de correos automáticos
✅ Recepción y almacenamiento de correos
✅ APIs REST para integración
✅ Detección automática de nuevos correos
✅ Parseo de correos (from, subject, body, html)

## Próximos pasos

- Conectar a base de datos para guardar correos
- Agregar filtros de spam
- Crear respuestas automáticas
- Integrar con tu aplicación web
- Agregar notificaciones en tiempo real
