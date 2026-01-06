# Pasos para subir a GitHub y desplegar

## Opción 1: Usar GitHub Desktop (Recomendado - más fácil)

1. Descargar e instalar [GitHub Desktop](https://desktop.github.com/)
2. Abrir GitHub Desktop
3. Click en "File" > "Add Local Repository"
4. Seleccionar la carpeta: `C:\Users\fernando.barrera\bonsáiapp\bonsái-shop`
5. Si pregunta "crear repositorio", click en "create a repository"
6. Click en "Publish repository"
7. Nombre del repositorio: `bonsáiahopApp`
8. Desmarcar "Keep this code private" si quieres que sea público
9. Click en "Publish repository"

## Opción 2: Usar línea de comandos

Si Git está instalado en tu sistema, ejecutar:

```bash
cd C:\Users\fernando.barrera\bonsáiapp\bonsái-shop
git init
git add .
git commit -m "Initial commit - Bonsái Shop"
git branch -M main
git remote add origin https://github.com/ferbarjim200017/bonsáiahopApp.git
git push -u origin main
```

## Deployment en Vercel (GRATIS y FÁCIL)

### Opción A: Conectar desde GitHub (Más fácil)

1. Ir a [https://vercel.com](https://vercel.com)
2. Click en "Sign Up" y usar tu cuenta de GitHub
3. Click en "Add New..." > "Project"
4. Importar repositorio `ferbarjim200017/bonsáiahopApp`
5. Click en "Deploy"
6. ¡Listo! Tu web estará en: `https://bonsáiahop-app.vercel.app`

### Opción B: Usar Vercel CLI

```bash
npm install -g vercel
cd C:\Users\fernando.barrera\bonsáiapp\bonsái-shop
vercel login
vercel --prod
```

## Deployment en GitHub Pages (Requiere más configuración)

GitHub Pages no soporta Next.js directamente. Necesitarías:
- Exportar como sitio estático (perderías funcionalidad del servidor)
- O usar GitHub Actions para build y deploy

**RECOMENDACIÓN: Usar Vercel** - Es gratuito, más rápido, y diseñado para Next.js.

## Dominio personalizado (después del deployment)

Una vez desplegado en Vercel, puedes:
1. Ir a configuración del proyecto en Vercel
2. Click en "Domains"
3. Añadir tu dominio personalizado
4. Seguir las instrucciones de DNS

## URLs de ejemplo después del deployment

- **Vercel:** `https://bonsáiahop-app.vercel.app`
- **GitHub Pages (si se configura):** `https://ferbarjim200017.github.io/bonsáiahopApp`

## Problemas comunes

### Error: "git not found"
- Instalar Git desde: https://git-scm.com/download/win
- O usar GitHub Desktop (más fácil)

### Error: "permission denied"
- Usar GitHub Desktop en su lugar
- O configurar SSH key en GitHub

### Build error en deployment
- Verificar que `npm run build` funcione localmente
- Revisar errores en logs de Vercel
