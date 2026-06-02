📋 CONFIGURACIÓN DE EMAIL - PASO A PASO

================================
INSTRUCCIONES PARA DISBIT
================================

El correo ya está configurado. Para que Disbit pueda conectarse:

1️⃣  COMPARTE ESTA INFORMACIÓN CON DISBIT:
   - Email: info@rotulweb.com
   - Host SMTP: blue.disbit.com
   - Puerto SMTP: 587
   - Seguridad SMTP: STARTTLS (requireTLS)
   - Host IMAP: blue.disbit.com
   - Puerto IMAP: 993
   - Seguridad IMAP: TLS/SSL

2️⃣  CUANDO TE PIDAN LA CONTRASEÑA:
   - Usa la contraseña de tu email de Disbit (info@rotulweb.com)
   - Sin espacios
   - Sin caracteres especiales innecesarios

3️⃣  SI NECESITAS CAMBIAR LA CONTRASEÑA:
   Ejecuta:
   ```
   node setupEmail.js
   ```
   Y sigue las instrucciones interactivas

================================
VERIFICAR QUE TODO FUNCIONA
================================

1. Prueba SMTP e IMAP:
   ```
   node testEmail.js
   ```

2. Inicia el bot:
   ```
   npm run email-bot
   ```

3. Deberías ver:
   ✅ SMTP conectado
   ✅ IMAP conectado
   🚀 Bot escuchando en puerto 3001

================================
ARCHIVOS CONFIGURADOS
================================

✅ emailBot.js - Bot principal
✅ notifications.js - Envío de notificaciones
✅ testEmail.js - Prueba de conexión
✅ setupEmail.js - Configuración interactiva
✅ .env - Variables de entorno
✅ .env.example - Ejemplo de configuración

================================
¿PROBLEMAS?
================================

Error "Connection refused":
→ Verifica que el host y puerto sean correctos

Error "Authentication failed":
→ Verifica la contraseña sin espacios

Error "TLS required":
→ Ya está configurado requireTLS en todos lados

¿Necesitas ayuda? Contacta a Disbit con esta configuración.
