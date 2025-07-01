Write-Host "Starting build process for ChatApp..." -ForegroundColor Green

# Install backend dependencies
Write-Host "Installing backend dependencies..." -ForegroundColor Yellow
Set-Location backend
npm install

# Install frontend dependencies  
Write-Host "Installing frontend dependencies..." -ForegroundColor Yellow
Set-Location ..\frontend
npm install

# Build frontend
Write-Host "Building frontend..." -ForegroundColor Yellow
npm run build

# Check if build was successful
if (Test-Path "dist\index.html") {
    Write-Host "✅ Frontend build successful - index.html found in dist/" -ForegroundColor Green
    Get-ChildItem dist\
} else {
    Write-Host "❌ Frontend build failed - index.html not found in dist/" -ForegroundColor Red
    exit 1
}

Write-Host "✅ Build process completed successfully!" -ForegroundColor Green
