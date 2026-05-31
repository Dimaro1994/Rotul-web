# 🤖 Search Agent - Agente Automático de Búsqueda y Contacto

Agente inteligente que busca empresas en internet y se contacta automáticamente con clientes potenciales.

## 📋 Requisitos

Para que el agente funcione necesitas:

### 1. Google Custom Search API
1. Ve a [Google Cloud Console](https://console.cloud.google.com/)
2. Crea un nuevo proyecto
3. Activa la API "Custom Search API"
4. Genera una clave API
5. Ve a [Programmable Search Engine](https://cse.google.com/cse/)
6. Crea un nuevo motor de búsqueda (Search Engine ID)

### 2. Configuración de Email (.env)
```
# Email SMTP (Gmail, Outlook, etc.)
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
EMAIL_USER=tu_email@gmail.com
EMAIL_PASSWORD=tu_contraseña_app

# Email IMAP (para recibir correos)
EMAIL_HOST=imap.gmail.com
EMAIL_PORT=993

# Google Search
GOOGLE_API_KEY=tu_api_key
GOOGLE_SEARCH_ENGINE_ID=tu_search_engine_id

# Puerto del Bot
BOT_PORT=3001
```

## 🚀 Uso

### Opción 1: Búsqueda Manual desde API

```bash
curl -X POST http://localhost:3001/api/search-contacts \
  -H "Content-Type: application/json" \
  -d '{
    "industry": "restaurantes",
    "location": "Barcelona"
  }'
```

### Opción 2: Contactar todos los leads encontrados

```bash
curl -X POST http://localhost:3001/api/contact-leads
```

### Opción 3: Ver todos los leads guardados

```bash
curl http://localhost:3001/api/leads
```

### Opción 4: Eliminar un lead específico

```bash
curl -X DELETE http://localhost:3001/api/leads/0
```

## 🔄 Flujo Automático

1. **Búsqueda**: El agente busca empresas en Google según criterios
2. **Extracción**: Extrae contactos (emails) de las páginas web encontradas
3. **Almacenamiento**: Guarda los contactos en `leads.json`
4. **Contacto**: Envía emails personalizados a cada empresa
5. **Seguimiento**: Registra qué leads ya han sido contactados

## 📁 Archivos Generados

- `leads.json` - Lista de contactos encontrados
- `processed_leads.json` - Registro de leads ya contactados

## ⚙️ Funcionalidades Principales

✅ Búsqueda automática en Google  
✅ Extracción de emails desde páginas web  
✅ Envío masivo de correos personalizados  
✅ Base de datos de leads  
✅ Evita contactar dos veces al mismo lead  
✅ Intervalos de espera entre emails (anti-spam)

## 🎯 Casos de Uso

- Buscar restaurantes sin web en tu ciudad
- Encontrar tiendas locales para ofrecer SEO
- Buscar startups que necesiten web
- Contactar pymes en industrias específicas

## 📊 Estadísticas

El agente registra:
- Fecha de búsqueda
- Empresa encontrada
- Emails extraídos
- Fecha de contacto
- Estado de envío

## ⚠️ Consideraciones

- Respetar términos de servicio de Google
- No hacer búsquedas masivas demasiado rápido (spam)
- Usar cuentas de email verificadas
- Personalizar el contenido del email según la industria

---

**Creado para Rotulweb** 🚀
