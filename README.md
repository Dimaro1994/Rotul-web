# Rotulweb (React + WhatsApp Integration)

## 🆕 ¡Agente WhatsApp Integrado! 

Se ha agregado un **agente de WhatsApp completo** a tu aplicación. Recibe y envía mensajes directamente desde tu web.

### ⚡ Quick Start (5 minutos)

```bash
# 1. Instalar dependencias del backend
npm install express dotenv axios cors body-parser

# 2. Crear archivo .env
cp .env.example .env

# 3. Iniciar backend (terminal 1)
node server.js

# 4. Iniciar frontend (terminal 2)
npm run dev
```

### 📚 Documentación

- **[QUICK_START.md](./QUICK_START.md)** ← Empieza aquí
- **[WHATSAPP_SETUP_COMPLETE.md](./WHATSAPP_SETUP_COMPLETE.md)** - Guía completa
- **[FAQ.md](./FAQ.md)** - Preguntas frecuentes
- **[RESUMEN_IMPLEMENTACION.txt](./RESUMEN_IMPLEMENTACION.txt)** - Resumen visual

---

## Arranque rápido (Frontend)

1. Instala dependencias:
   ```bash
   npm install
   ```
2. Inicia el entorno de desarrollo:
   ```bash
   npm run dev
   ```
3. Abre en navegador la URL que te muestre Vite.

## Estructura

- `src/`: componentes y estilos de React.
  - `WhatsAppWidget.jsx` ← Widget de chat
  - `WhatsAppWidget.css` ← Estilos del widget
- `public/`: recursos estáticos.
- `server.js`: Servidor Express para WhatsApp
- `whatsappController.js`: Lógica de mensajes
- `whatsappRoutes.js`: Rutas del API
- `vite.config.js`: configuración de Vite.
- `package.json`: scripts y dependencias.

## Scripts disponibles

```bash
npm run dev          # Frontend
npm run backend      # Backend
npm run dev:full     # Ambos juntos
npm run build        # Build para producción
npm run preview      # Preview del build
```
