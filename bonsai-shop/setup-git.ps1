# Script para inicializar Git y subir a GitHub
# Ejecutar: .\setup-git.ps1

Write-Host "==================================" -ForegroundColor Green
Write-Host "  CONFIGURACIÓN DE GIT Y GITHUB" -ForegroundColor Green
Write-Host "==================================" -ForegroundColor Green
Write-Host ""

# Verificar si Git está instalado
$gitInstalled = Get-Command git -ErrorAction SilentlyContinue

if (-not $gitInstalled) {
    Write-Host "❌ Git no está instalado" -ForegroundColor Red
    Write-Host ""
    Write-Host "Por favor, elige una opción:" -ForegroundColor Yellow
    Write-Host ""
    Write-Host "OPCIÓN 1 (RECOMENDADA): Usar VS Code" -ForegroundColor Cyan
    Write-Host "  1. Abre la pestaña 'Source Control' en VS Code (Ctrl+Shift+G)" -ForegroundColor White
    Write-Host "  2. Click en 'Initialize Repository'" -ForegroundColor White
    Write-Host "  3. Click en 'Publish to GitHub'" -ForegroundColor White
    Write-Host "  4. Nombre: bonsáiahopApp" -ForegroundColor White
    Write-Host "  5. ¡Listo!" -ForegroundColor White
    Write-Host ""
    Write-Host "OPCIÓN 2: Instalar Git" -ForegroundColor Cyan
    Write-Host "  1. Descargar desde: https://git-scm.com/download/win" -ForegroundColor White
    Write-Host "  2. Instalar con opciones por defecto" -ForegroundColor White
    Write-Host "  3. Reiniciar PowerShell" -ForegroundColor White
    Write-Host "  4. Ejecutar este script de nuevo" -ForegroundColor White
    Write-Host ""
    Write-Host "OPCIÓN 3: Usar GitHub Desktop" -ForegroundColor Cyan
    Write-Host "  1. Descargar desde: https://desktop.github.com/" -ForegroundColor White
    Write-Host "  2. File > Add Local Repository" -ForegroundColor White
    Write-Host "  3. Seleccionar esta carpeta" -ForegroundColor White
    Write-Host "  4. Publish repository" -ForegroundColor White
    Write-Host ""
    exit 1
}

Write-Host "✓ Git está instalado" -ForegroundColor Green
Write-Host ""

# Inicializar repositorio
if (-not (Test-Path ".git")) {
    Write-Host "📦 Inicializando repositorio Git..." -ForegroundColor Cyan
    git init
    Write-Host "✓ Repositorio inicializado" -ForegroundColor Green
} else {
    Write-Host "✓ Repositorio ya existe" -ForegroundColor Green
}

# Agregar archivos
Write-Host ""
Write-Host "📝 Agregando archivos..." -ForegroundColor Cyan
git add .

# Commit
Write-Host "💾 Creando commit inicial..." -ForegroundColor Cyan
git commit -m "Initial commit: Bonsái Shop - E-commerce completo"

# Configurar rama principal
Write-Host "🔧 Configurando rama principal..." -ForegroundColor Cyan
git branch -M main

# Verificar si ya existe remote
$remoteExists = git remote -v | Select-String "origin"

if (-not $remoteExists) {
    Write-Host ""
    Write-Host "🔗 Configurando repositorio remoto..." -ForegroundColor Cyan
    Write-Host ""
    Write-Host "Opciones:" -ForegroundColor Yellow
    Write-Host "1. Conectar a repositorio existente" -ForegroundColor White
    Write-Host "2. Usar VS Code para publicar (más fácil)" -ForegroundColor White
    Write-Host ""
    $opcion = Read-Host "Elige una opción (1 o 2)"
    
    if ($opcion -eq "1") {
        $repoUrl = Read-Host "Introduce la URL del repositorio (ej: https://github.com/ferbarjim200017/bonsáiahopApp.git)"
        git remote add origin $repoUrl
        
        Write-Host ""
        Write-Host "📤 Subiendo cambios a GitHub..." -ForegroundColor Cyan
        git push -u origin main
        
        Write-Host ""
        Write-Host "✅ ¡Proyecto subido exitosamente!" -ForegroundColor Green
    } else {
        Write-Host ""
        Write-Host "Pasos para publicar con VS Code:" -ForegroundColor Yellow
        Write-Host "1. Abre la pestaña 'Source Control' (Ctrl+Shift+G)" -ForegroundColor White
        Write-Host "2. Click en el botón '...' (más opciones)" -ForegroundColor White
        Write-Host "3. Click en 'Push to...'" -ForegroundColor White
        Write-Host "4. Selecciona 'Publish to GitHub'" -ForegroundColor White
        Write-Host "5. Nombre: bonsáiahopApp" -ForegroundColor White
        Write-Host ""
    }
} else {
    Write-Host "✓ Remote ya configurado" -ForegroundColor Green
    git push -u origin main
}

Write-Host ""
Write-Host "==================================" -ForegroundColor Green
Write-Host "  SIGUIENTE PASO: VERCEL" -ForegroundColor Green
Write-Host "==================================" -ForegroundColor Green
Write-Host ""
Write-Host "1. Ve a: https://vercel.com" -ForegroundColor Cyan
Write-Host "2. Sign up con tu cuenta de GitHub" -ForegroundColor Cyan
Write-Host "3. Click 'Add New' > 'Project'" -ForegroundColor Cyan
Write-Host "4. Importa: ferbarjim200017/bonsáiahopApp" -ForegroundColor Cyan
Write-Host "5. Click 'Deploy'" -ForegroundColor Cyan
Write-Host "6. ¡Tu web estará lista en ~2 minutos!" -ForegroundColor Cyan
Write-Host ""
