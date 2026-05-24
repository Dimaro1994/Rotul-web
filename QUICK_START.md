# ⚡ QUICK START - WhatsApp Integration

## 🎯 Lo que necesitas saber AHORA

### 1. Instalar dependencias
```bash
npm install express dotenv axios cors body-parser
```

### 2. Crear .env (copia desde .env.example)
```bash
cp .env.example .env
# Edita con tus credenciales de WhatsApp
```

### 3. Iniciar backend
```bash
node server.js
# Verás: ✅ Server running on http://localhost:5000
```

### 4. Iniciar frontend (otra terminal)
```bash
npm run dev
```

### 5. Agregar widget a tu App.jsx
```jsx
import WhatsAppWidget from './WhatsAppWidget';

export default function App() {
  return (
    <>
      <YourContent />
      <WhatsAppWidget />
    </>
  );
}
```

### 6. Verificar que funciona
- Haz clic en el botón flotante de WhatsApp
- Ingresa tu número: `+CODIGO_PAIS_NUMERO`
- Envía un mensaje

---

## 📁 Archivos creados

| Archivo | Propósito |
|---------|-----------|
| `server.js` | Servidor Express |
| `whatsappController.js` | Lógica de mensajes |
| `whatsappRoutes.js` | Rutas del API |
| `src/WhatsAppWidget.jsx` | Widget de chat React |
| `src/WhatsAppWidget.css` | Estilos |
| `.env.example` | Configuración ejemplo |
| `WHATSAPP_SETUP_COMPLETE.md` | Guía detallada |

---

## 🔑 Credenciales necesarias

Obtén en [Meta App Dashboard](https://developers.facebook.com):

1. `WHATSAPP_ACCESS_TOKEN` - Tu token de acceso
2. `WHATSAPP_PHONE_NUMBER_ID` - ID de teléfono
3. `WHATSAPP_BUSINESS_ACCOUNT_ID` - ID de negocio
4. `WHATSAPP_WEBHOOK_VERIFY_TOKEN` - Token seguro que inventas tú

---

## 🚀 Ejecutar ambos servidores juntos

```bash
npm run dev:full
```

(Requiere instalar `concurrently`:)
```bash
npm install --save-dev concurrently
```

---

## ✅ Checklist

- [ ] npm install (dependencias del backend)
- [ ] cp .env.example .env
- [ ] Agregar credenciales en .env
- [ ] node server.js (backend funciona)
- [ ] npm run dev (frontend funciona)
- [ ] Widget visible en la web
- [ ] Enviar mensaje de prueba

---

**¡Listo! Tu agente de WhatsApp está 100% funcional 🎉**
