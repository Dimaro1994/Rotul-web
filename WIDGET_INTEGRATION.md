# 🔌 Integración del Widget WhatsApp en React

## Paso 1: Importar el widget en tu aplicación

En tu `App.jsx` o componente principal:

```jsx
import WhatsAppWidget from './WhatsAppWidget';

export default function App() {
  return (
    <div>
      {/* Tu contenido aquí */}
      <WhatsAppWidget />
    </div>
  );
}
```

## Paso 2: Asegurar que los estilos estén importados

El archivo `WhatsAppWidget.css` se importa automáticamente dentro del componente.

## Paso 3: Configurar CORS en el backend

En `server.js`, verifica que CORS esté habilitado para tu dominio:

```javascript
app.use(cors({
  origin: ['http://localhost:5173', 'https://tu-dominio.com'],
  credentials: true
}));
```

## Características del Widget

✅ **Botón flotante** - Fijo en la esquina inferior derecha
✅ **Chat interactivo** - Mensaje bidireccional
✅ **Validación** - Requiere número de teléfono
✅ **Responsive** - Funciona en móvil y desktop
✅ **Confirmación** - Muestra estado de envío
✅ **Animaciones** - Suave y profesional

## Estructura del Widget

```
WhatsAppWidget (componente principal)
├── Botón flotante
│   └── Ícono SVG de WhatsApp
├── Modal de chat (cuando está abierto)
│   ├── Header con título
│   ├── Área de mensajes (scrolleable)
│   └── Formulario
│       ├── Input de teléfono
│       ├── Input de mensaje
│       └── Botón Enviar
```

## Personalización

### Cambiar color
En `WhatsAppWidget.css`, reemplaza `#25d366` con tu color:

```css
.whatsapp-button {
  background: linear-gradient(135deg, #TU_COLOR 0%, #TU_COLOR_OSCURO 100%);
}
```

### Cambiar posición del botón
En `WhatsAppWidget.css`:

```css
.whatsapp-button {
  bottom: 20px;  /* Distancia desde abajo */
  right: 20px;   /* Distancia desde la derecha */
}
```

### Cambiar tamaño del widget
En `WhatsAppWidget.css`:

```css
.whatsapp-widget {
  width: 380px;   /* Ancho */
  height: 600px;  /* Alto */
}
```

## Testing

1. Inicia el backend:
   ```bash
   node server.js
   ```

2. Inicia el frontend:
   ```bash
   npm run dev
   ```

3. Abre http://localhost:5173 (o el puerto de Vite)

4. Haz clic en el botón flotante de WhatsApp

5. Ingresa tu número de teléfono y envía un mensaje

¡Listo! El widget debería funcionar correctamente.
