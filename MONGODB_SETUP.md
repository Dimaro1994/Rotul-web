# MongoDB Setup - Windows

## Opción 1: Instalación Local (Recomendado)

### Paso 1: Descargar MongoDB

1. Ve a https://www.mongodb.com/try/download/community
2. Selecciona:
   - **OS**: Windows
   - **Version**: Latest
   - Descarga el `.msi` (instalador)

### Paso 2: Instalar

1. Ejecuta el instalador `.msi`
2. Selecciona "Complete" en el Setup Type
3. Marca la opción "Install MongoD as a Service"
4. Completa la instalación

### Paso 3: Verificar que está corriendo

En PowerShell o CMD:
```bash
# Verificar que el servicio está activo
Get-Service MongoDB | Select-Object -Property Status

# O acceder a MongoDB:
mongosh
```

Si ves `db >` estás conectado ✅

## Opción 2: MongoDB Atlas (Nube)

### Paso 1: Crear cuenta

1. Ve a https://www.mongodb.com/cloud/atlas
2. Crea una cuenta gratis
3. Crea un "Cluster" gratuito

### Paso 2: Obtener conexión

1. Click en "Connect"
2. Selecciona "Connect your application"
3. Copia la connection string
4. Reemplaza `<username>` y `<password>`

### Paso 3: Actualizar .env

```bash
MONGODB_URI=mongodb+srv://usuario:contraseña@cluster.mongodb.net/rotulweb?retryWrites=true&w=majority
```

## Iniciar MongoDB (Local)

### Windows 10/11 - Servicio automático

Si lo instalaste como servicio, MongoDB ya está corriendo.

Verifica:
```bash
Get-Service MongoDB
# Status: Running ✅
```

### Windows - Ejecutar manualmente

Si quieres ejecutarlo manualmente:

1. Abre PowerShell como Admin
2. Navega a la carpeta de MongoDB:
```bash
cd "C:\Program Files\MongoDB\Server\7.0\bin"

# O donde lo instalaste
```

3. Ejecuta MongoDB:
```bash
.\mongod.exe
```

Deberías ver:
```
[initandlisten] Waiting for connections on port 27017
```

## Verificar conexión

```bash
# En otra ventana/terminal
mongosh

# Deberías ver algo como:
# test> 

# Luego:
db.version()
# "7.0.0" (o tu versión)
```

## Ahora sí, ejecuta el test

```bash
npm run instagram-lead
```

## Si aún no funciona

Revisa:

1. **¿MongoDB está corriendo?**
   ```bash
   Get-Service MongoDB
   # Status debe ser "Running"
   ```

2. **¿Puerto 27017 está disponible?**
   ```bash
   netstat -ano | findstr :27017
   ```

3. **¿La conexión es correcta?**
   Prueba en mongosh:
   ```bash
   mongosh "mongodb://localhost:27017/rotulweb"
   ```

## Alternativa: MongoDB en Docker (Si tienes Docker)

```bash
docker run -d -p 27017:27017 --name mongodb mongo:latest
```

Luego:
```bash
npm run instagram-lead
```

## Comandos útiles

```bash
# Ver todas las bases de datos
show databases;

# Usar la base de datos rotulweb
use rotulweb;

# Ver colecciones
show collections;

# Contar leads
db.instagramleads.countDocuments();

# Ver un lead
db.instagramleads.findOne();
```

¡Listo! Ahora MongoDB está configurado.
