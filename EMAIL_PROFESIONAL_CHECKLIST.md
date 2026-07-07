# Checklist de correo profesional para Rotulweb

## 1. Verifica que el archivo .env tenga estos valores

EMAIL_USER=info@rotulweb.com
EMAIL_PASSWORD=tu_contraseña_real_del_buzón
EMAIL_HOST=blue.disbit.com
EMAIL_PORT=993
SMTP_HOST=blue.disbit.com
SMTP_PORT=587
SMTP_SECURE=false
SMTP_REQUIRE_TLS=true
BOT_PORT=3002

## 2. Prueba el envío desde el proyecto

Ejecuta:

node --input-type=module -e "import('./services/emailService.js').then(async ({sendEmail})=>{const result=await sendEmail('tu_email_destino@dominio.com','Prueba Rotulweb','Mensaje de prueba'); console.log(JSON.stringify(result));}).catch(err=>{console.error(err); process.exit(1);})"

## 3. Si falla, revisa estos puntos

- La contraseña del buzón es correcta.
- El buzón admite SMTP/IMAP desde aplicaciones.
- Si Disbit lo exige, usa una contraseña de aplicación.
- No dejes espacios al final de la contraseña.
- Asegúrate de que el usuario sea exactamente el correo profesional.

## 4. Si quieres probar el agente completo

Ejecuta:

npm run email-bot

## 5. Si sigue fallando

Muestra en la consola el mensaje exacto de error y revisa:
- si la contraseña es correcta,
- si el buzón está activo,
- si el panel del proveedor exige autenticación adicional.
