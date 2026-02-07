# ISL Translation System - Deployment Helper (Windows)
# Quick deployment script for Windows users

Write-Host "============================================================" -ForegroundColor Cyan
Write-Host "🚀 ISL Translation System - Deployment Helper" -ForegroundColor Cyan
Write-Host "============================================================" -ForegroundColor Cyan
Write-Host ""

# Check if git is initialized
if (-not (Test-Path ".git")) {
    Write-Host "📦 Initializing Git repository..." -ForegroundColor Yellow
    git init
    git add .
    git commit -m "Initial commit - ISL Translation System"
    Write-Host "✅ Git initialized" -ForegroundColor Green
} else {
    Write-Host "✅ Git repository already initialized" -ForegroundColor Green
}

Write-Host ""
Write-Host "============================================================" -ForegroundColor Cyan
Write-Host "📋 Pre-Deployment Checklist" -ForegroundColor Cyan
Write-Host "============================================================" -ForegroundColor Cyan
Write-Host ""

# Check frontend build
Write-Host "🔍 Checking frontend build..." -ForegroundColor Yellow
Set-Location isl-frontend
$buildResult = npm run build
if ($LASTEXITCODE -eq 0) {
    Write-Host "✅ Frontend builds successfully" -ForegroundColor Green
} else {
    Write-Host "❌ Frontend build failed. Please fix errors before deploying." -ForegroundColor Red
    Set-Location ..
    exit 1
}
Set-Location ..

Write-Host ""
Write-Host "============================================================" -ForegroundColor Cyan
Write-Host "📤 Deployment Options" -ForegroundColor Cyan
Write-Host "============================================================" -ForegroundColor Cyan
Write-Host ""
Write-Host "1. Deploy Frontend to Vercel" -ForegroundColor White
Write-Host "2. Deploy Backend to Render" -ForegroundColor White
Write-Host "3. Deploy Both (Recommended)" -ForegroundColor White
Write-Host "4. Exit" -ForegroundColor White
Write-Host ""

$choice = Read-Host "Choose an option (1-4)"

switch ($choice) {
    "1" {
        Write-Host ""
        Write-Host "🎨 Deploying Frontend to Vercel..." -ForegroundColor Green
        Write-Host ""
        Write-Host "Next steps:" -ForegroundColor Yellow
        Write-Host "1. Go to https://vercel.com"
        Write-Host "2. Click 'New Project'"
        Write-Host "3. Import your GitHub repository"
        Write-Host "4. Set Root Directory to: isl-frontend"
        Write-Host "5. Framework: Vite"
        Write-Host "6. Click Deploy"
        Write-Host ""
    }
    "2" {
        Write-Host ""
        Write-Host "🐍 Deploying Backend to Render..." -ForegroundColor Green
        Write-Host ""
        Write-Host "Next steps:" -ForegroundColor Yellow
        Write-Host "1. Go to https://render.com"
        Write-Host "2. Click 'New +' → 'Blueprint'"
        Write-Host "3. Connect your GitHub repository"
        Write-Host "4. Select render.yaml"
        Write-Host "5. Click Apply"
        Write-Host ""
    }
    "3" {
        Write-Host ""
        Write-Host "🚀 Deploying Full Stack Application..." -ForegroundColor Green
        Write-Host ""
        Write-Host "Step 1: Deploy Backend First" -ForegroundColor Yellow
        Write-Host "1. Go to https://render.com"
        Write-Host "2. Click 'New +' → 'Blueprint'"
        Write-Host "3. Connect your GitHub repository"
        Write-Host "4. Select render.yaml"
        Write-Host "5. Click Apply"
        Write-Host "6. Wait for deployment to complete"
        Write-Host "7. Copy your backend URL (e.g., https://isl-backend-xxxx.onrender.com)"
        Write-Host ""
        Write-Host "Step 2: Deploy Frontend" -ForegroundColor Yellow
        Write-Host "1. Go to https://vercel.com"
        Write-Host "2. Click 'New Project'"
        Write-Host "3. Import your GitHub repository"
        Write-Host "4. Set Root Directory to: isl-frontend"
        Write-Host "5. Framework: Vite"
        Write-Host "6. Add Environment Variables:"
        Write-Host "   VITE_API_URL=<your-backend-url>"
        Write-Host "   VITE_SOCKET_URL=<your-backend-url>"
        Write-Host "7. Click Deploy"
        Write-Host ""
    }
    "4" {
        Write-Host "👋 Exiting..." -ForegroundColor Gray
        exit 0
    }
    default {
        Write-Host "❌ Invalid option" -ForegroundColor Red
        exit 1
    }
}

Write-Host "============================================================" -ForegroundColor Cyan
Write-Host "📚 Additional Resources" -ForegroundColor Cyan
Write-Host "============================================================" -ForegroundColor Cyan
Write-Host ""
Write-Host "📖 Full deployment guide: DEPLOYMENT.md" -ForegroundColor White
Write-Host "🔗 Vercel: https://vercel.com/docs" -ForegroundColor White
Write-Host "🔗 Render: https://render.com/docs" -ForegroundColor White
Write-Host ""
Write-Host "✅ Good luck with your deployment! 🚀" -ForegroundColor Green
Write-Host ""
