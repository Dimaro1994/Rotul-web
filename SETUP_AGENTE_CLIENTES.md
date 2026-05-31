# 🚀 SETUP RÁPIDO - AGENTE DE GESTIÓN DE CLIENTES

## ⚡ EN 3 PASOS ESTÁ TODO LISTO

### 1️⃣ MONGODB - ELIGE UNA OPCIÓN

**Opción A: Local (Recomendado)**
- Descarga: https://www.mongodb.com/try/download/community
- Instala el instalador
- ✅ Hecho - corre automáticamente en localhost:27017

**Opción B: Online (MongoDB Atlas)**
- Ve a: https://www.mongodb.com/cloud/atlas
- Crea cuenta gratuita
- Crea un cluster
- Copia connection string
- En `.env` reemplaza: `MONGODB_URI=tu_connection_string`

### 2️⃣ INSTALAR & INICIAR
```bash
cd c:\Users\marin\Desktop\Rotulweb\Rotulweb

# Instalar dependencias (si aún no)
npm install

# INICIAR TODO
npm run start:all
```

### 3️⃣ ACCEDER
- **Web principal**: http://localhost:5173
- **Dashboard**: http://localhost:5173?admin=dashboard

---

## ✅ TODO LO QUE ESTÁ INCLUIDO

### Base de datos
- ✅ Modelo de Cliente (15 campos)
- ✅ Modelo de Tarea
- ✅ Conexión a MongoDB

### Backend API
- ✅ 9 endpoints para clientes
- ✅ 4 endpoints para tareas
- ✅ Estadísticas en tiempo real

### Frontend
- ✅ Dashboard con stats
- ✅ Formulario con 10 secciones
- ✅ Filtros y búsqueda
- ✅ Seguimiento de progreso
- ✅ Modal de detalles

### Validación
- ✅ Datos requeridos
- ✅ Formulario interactivo
- ✅ Manejo de errores

---

## 🎯 PRIMER USO

1. Abre http://localhost:5173?admin=dashboard
2. Haz clic en "➕ Nuevo Cliente"
3. Llena el formulario
4. Haz clic en "✅ Crear Cliente"
5. ¡Listo! El cliente aparece en el dashboard

---

## 🔌 ACCESO A API (para herramientas externas)

```bash
# Ver todos los clientes
curl http://localhost:5000/api/clients

# Ver estadísticas
curl http://localhost:5000/api/dashboard/stats

# Crear cliente (JSON)
curl -X POST http://localhost:5000/api/clients \
  -H "Content-Type: application/json" \
  -d '{"companyName":"Mi Empresa","contactName":"Juan","email":"juan@email.com","phone":"+34123","projectType":"website"}'
```

---

## 🚨 SI ALGO NO FUNCIONA

**"MongoDB no está conectado"**
→ Abre Services (Windows) y busca "MongoDB"

**"Puerto en uso"**
→ Cambia PORT en .env

**"Dashboard no carga"**
→ Abre consola (F12) y revisa errores

---

## 📖 MÁS INFO

Lee `CLIENTE_MANAGER_README.md` para documentación completa.

---

**¡LISTO! Tu sistema de gestión de clientes está operativo.** 🎉
