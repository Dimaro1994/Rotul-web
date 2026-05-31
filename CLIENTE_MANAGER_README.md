# 🎯 Sistema Completo de Gestión de Clientes - Rotulweb

## ✅ LISTO PARA USAR

Sistema integrado que incluye:
- ✅ **Dashboard** para gestionar clientes
- ✅ **Formulario detallado** para capturar info del cliente
- ✅ **Base de datos MongoDB** para almacenar proyectos
- ✅ **API REST** completa para gestionar clientes y tareas
- ✅ **Bot de email** integrado para notificaciones
- ✅ **Sistema de seguimiento** de proyectos

---

## 📋 ¿QUÉ INCLUYE?

### 1. **Dashboard Principal** 📊
- Ver todos los clientes
- Filtrar por estado (nuevo, en proceso, revisión, completado)
- Estadísticas en tiempo real
- Seguimiento de progreso (diseño + desarrollo)
- Control de pagos
- Acciones rápidas (procesar, completar, eliminar)

### 2. **Formulario Detallado** 📝
Captura toda la información del cliente:
- Datos básicos (nombre, contacto, email, teléfono)
- Tipo de proyecto (web, diseño, ambos)
- Preferencias de diseño (estilo, colores, elementos)
- Funcionalidades requeridas (e-commerce, blog, formularios, etc.)
- Integraciones (Facebook, Instagram, Stripe, WhatsApp, etc.)
- Páginas necesarias (inicio, servicios, contacto, etc.)
- Información técnica (dominio, hosting)
- Presupuesto y plazo
- Notas adicionales

### 3. **Gestión de Proyectos** 🚀
- Estado: Nuevo → En Proceso → Revisión → Completado
- Progreso: 0-100% en Diseño y Desarrollo
- Estado de pago: Pendiente, Parcial, Completado
- Historial de cambios

### 4. **API REST** 🔌
```
GET    /api/clients                 - Obtener todos los clientes
GET    /api/clients/:id             - Obtener cliente específico
POST   /api/clients                 - Crear nuevo cliente
PUT    /api/clients/:id             - Actualizar cliente
PATCH  /api/clients/:id/progress    - Actualizar progreso
PATCH  /api/clients/:id/status      - Cambiar estado
DELETE /api/clients/:id             - Eliminar cliente

GET    /api/clients/:clientId/tasks - Obtener tareas del cliente
POST   /api/clients/:clientId/tasks - Crear tarea
PUT    /api/tasks/:id               - Actualizar tarea
DELETE /api/tasks/:id               - Eliminar tarea

GET    /api/dashboard/stats         - Estadísticas generales
```

---

## 🚀 CÓMO EMPEZAR

### PASO 1: Instalar MongoDB
Elige una opción:

**Opción A: MongoDB Local (Recomendado para empezar)**
1. Descarga desde https://www.mongodb.com/try/download/community
2. Instala siguiendo el instalador
3. Por defecto corre en `mongodb://localhost:27017`
4. El .env ya tiene esto configurado

**Opción B: MongoDB Atlas (Cloud - Sin instalación)**
1. Ve a https://www.mongodb.com/cloud/atlas
2. Crea una cuenta gratuita
3. Crea un cluster
4. Copia la connection string
5. Reemplaza en `.env`:
```
MONGODB_URI=mongodb+srv://usuario:password@cluster.mongodb.net/rotulweb
```

### PASO 2: Instalar dependencias
```bash
npm install
```

### PASO 3: Iniciar el sistema completo
```bash
npm run start:all
```

Esto inicia simultáneamente:
- 🖥️ Backend en http://localhost:5000
- 🤖 Bot de email en http://localhost:3001
- 💻 Frontend en http://localhost:5173

### PASO 4: Acceder al Dashboard
Abre en el navegador:
- **Web principal**: http://localhost:5173
- **Dashboard**: http://localhost:5173?admin=dashboard

---

## 💡 CÓMO FUNCIONA

### 1. **Crear un nuevo cliente**
1. Abre http://localhost:5173?admin=dashboard
2. Haz clic en "➕ Nuevo Cliente"
3. Llena el formulario con toda la información
4. Haz clic en "✅ Crear Cliente"

### 2. **Gestionar proyectos**
- **Ver progreso**: Las barras muestran % de diseño y desarrollo
- **Cambiar estado**: Usa los botones "⚙️ Procesar" o "✅ Completar"
- **Ver detalles**: Haz clic en "👁️ Ver"
- **Eliminar**: Haz clic en "🗑️"

### 3. **Filtrar clientes**
- Haz clic en los botones de filtro: Todos, Nuevos, En Proceso, etc.
- Las estadísticas se actualizan automáticamente

### 4. **Ver estadísticas**
En la parte superior ves:
- Total de clientes
- Clientes en proceso
- Clientes completados
- Presupuesto total

---

## 🔧 COMANDOS DISPONIBLES

```bash
# Iniciar todo
npm run start:all

# O iniciar por separado:
npm run dev:full          # Backend + Frontend
npm run dev               # Solo Frontend
npm run backend           # Solo Backend
npm run email-bot         # Solo Bot de Email
npm run search-agent      # Search Agent (si existe)

# Compilar para producción
npm build

# Ver en producción
npm run preview
```

---

## 📡 ESTRUCTURA DE DATOS

### Cliente
```javascript
{
  _id: ObjectId,
  companyName: String,           // Nombre de empresa
  contactName: String,           // Nombre de contacto
  email: String,                 // Email
  phone: String,                 // Teléfono
  projectType: String,           // 'website', 'design', 'both'
  projectDescription: String,    // Descripción
  targetAudience: String,        // Audiencia objetivo
  colorPreferences: String,      // Colores
  designStyle: String,           // Estilo: 'minimalist', 'professional', etc.
  brandElements: String,         // Elementos de marca
  requiredFeatures: [String],    // Funcionalidades
  integrations: [String],        // Integraciones
  pages: [String],               // Páginas necesarias
  content: String,               // Contenido
  domain: String,                // Dominio
  hosting: String,               // Hosting
  budget: Number,                // Presupuesto
  deadline: Date,                // Plazo
  paymentStatus: String,         // 'pending', 'partial', 'completed'
  projectStatus: String,         // 'new', 'in-progress', 'review', 'completed'
  designProgress: Number,        // 0-100
  developmentProgress: Number,   // 0-100
  assignedTo: String,            // Asignado a
  notes: String,                 // Notas
  createdAt: Date,               // Creado en
  updatedAt: Date                // Actualizado en
}
```

### Tarea
```javascript
{
  _id: ObjectId,
  clientId: ObjectId,            // ID del cliente
  title: String,                 // Título
  description: String,           // Descripción
  category: String,              // 'design', 'development', 'content', 'review', 'revision'
  status: String,                // 'pending', 'in-progress', 'completed', 'blocked'
  priority: String,              // 'low', 'medium', 'high', 'urgent'
  assignedTo: String,            // Asignado a
  dueDate: Date,                 // Fecha límite
  completedAt: Date,             // Completado en
  notes: String,                 // Notas
  createdAt: Date,               // Creado en
  updatedAt: Date                // Actualizado en
}
```

---

## 🔐 SEGURIDAD

⚠️ **IMPORTANTE**: Este sistema está en desarrollo local.

Para producción, implementar:
- ✅ Autenticación y autorización
- ✅ Variables de entorno protegidas
- ✅ HTTPS
- ✅ Validación de datos
- ✅ Rate limiting
- ✅ Backups de base de datos

---

## 🐛 SOLUCIONAR PROBLEMAS

### ❌ "MongoDB no está conectado"
```
✅ Solución:
1. Verifica que MongoDB está corriendo
2. En Windows: Abre Services y busca "MongoDB"
3. Si no está instalado, ve a https://www.mongodb.com/try/download/community
```

### ❌ "Puerto 5000 ya en uso"
```
✅ Solución:
Cambia el puerto en .env:
PORT=5001
```

### ❌ "Dashboard no carga"
```
✅ Solución:
1. Abre http://localhost:5173?admin=dashboard
2. Revisa la consola: F12 → Console
3. Verifica que Backend está corriendo en http://localhost:5000
```

### ❌ "Errores de CORS"
```
✅ Solución:
El CORS ya está configurado en server.js.
Si aún hay problemas, verifica que el backend está en http://localhost:5000
```

---

## 📞 PRÓXIMAS MEJORAS SUGERIDAS

- [ ] Autenticación de usuario
- [ ] Roles y permisos
- [ ] Integración con bot de email automático
- [ ] Envío de notificaciones
- [ ] Export a PDF
- [ ] Integración con Google Calendar
- [ ] Asignación automática de tareas
- [ ] Recordatorios automáticos
- [ ] Análisis de rentabilidad
- [ ] Integración con CRM existente

---

## 📚 DOCUMENTACIÓN

- **MongoDB**: https://docs.mongodb.com/
- **Express**: https://expressjs.com/
- **React**: https://react.dev/
- **Mongoose**: https://mongoosejs.com/

---

**¿Preguntas?** Revisa el código en:
- Backend: `server.js`, `routes/clients.js`, `models/`
- Frontend: `src/components/Dashboard.jsx`, `src/components/ClientForm.jsx`
- Base de datos: `config/database.js`

¡Sistema listo para usar! 🚀
