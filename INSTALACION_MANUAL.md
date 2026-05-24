# 📖 INSTALACIÓN MANUAL - Paso a Paso

Si los scripts .bat te dieron error, sigue estos pasos MANUALMENTE en tu terminal:

## Paso 1: Abre CMD o PowerShell

Presiona: `Windows + R`
Escribe: `cmd`
Presiona: Enter

## Paso 2: Ve a la carpeta del proyecto

```
cd c:\Users\marin\Desktop\Rotulweb\Rotulweb
```

Presiona: Enter

## Paso 3: Instala Express

```
npm install express --save
```

Presiona: Enter
Espera a que termine

## Paso 4: Instala Dotenv

```
npm install dotenv --save
```

Presiona: Enter
Espera a que termine

## Paso 5: Instala Axios

```
npm install axios --save
```

Presiona: Enter
Espera a que termine

## Paso 6: Instala CORS

```
npm install cors --save
```

Presiona: Enter
Espera a que termine

## Paso 7: Instala Body Parser

```
npm install body-parser --save
```

Presiona: Enter
Espera a que termine

## Paso 8: Instala Concurrently (IMPORTANTE - la que probablemente falló)

```
npm install --save-dev concurrently
```

Presiona: Enter
Espera a que termine

Si falla con error, intenta con:

```
npm install --save-dev concurrently --legacy-peer-deps
```

## Paso 9: Verifica que todo se instaló

```
npm list express dotenv axios cors body-parser concurrently
```

Presiona: Enter

Deberías ver todas las dependencias listadas con versiones


## Paso 10: ¡LISTO!

Ahora puedes ejecutar:

```
node server.js
```

(En otra terminal)

```
npm run dev
```


═══════════════════════════════════════════════════════════════════════════════


⚠️ SI SIGUES TENIENDO ERRORES:

### Error: "npm: comando no encontrado"
→ Necesitas instalar Node.js desde: https://nodejs.org

### Error: "EACCES: permission denied"
→ Ejecuta CMD como Administrador (clic derecho → "Ejecutar como administrador")

### Error: "ERESOLVE unable to resolve dependency tree"
→ Intenta con flag: npm install --legacy-peer-deps

### Error: "ERR! code ENETWORK"
→ Tu internet está lento o DNS falla
→ Intenta de nuevo en unos minutos

### Error: "gyp ERR! build error"
→ Necesitas Visual Studio Build Tools
→ Descarga desde: https://visualstudio.microsoft.com/visual-cpp-build-tools/


═══════════════════════════════════════════════════════════════════════════════


✅ CHECKLIST FINAL

Después de instalar, verifica ejecutando en tu terminal:

```
npm list
```

Deberías ver en la salida:
  ✅ express
  ✅ dotenv
  ✅ axios
  ✅ cors
  ✅ body-parser
  ✅ concurrently (opcional)


═══════════════════════════════════════════════════════════════════════════════


🚀 CUANDO TODO ESTÉ INSTALADO

Abre 2 terminales:

Terminal 1:
```
cd c:\Users\marin\Desktop\Rotulweb\Rotulweb
node server.js
```

Terminal 2:
```
cd c:\Users\marin\Desktop\Rotulweb\Rotulweb
npm run dev
```

¡FUNCIONA! 🎉
