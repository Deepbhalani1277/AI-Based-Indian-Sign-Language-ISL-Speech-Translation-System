# ISL Translation System - Startup Script
# This script starts both frontend and backend servers

Write-Host "============================================================" -ForegroundColor Cyan
Write-Host "🚀 Starting ISL Translation System" -ForegroundColor Cyan
Write-Host "============================================================" -ForegroundColor Cyan
Write-Host ""

# Get the script directory
$scriptDir = Split-Path -Parent $MyInvocation.MyCommand.Path

# Define paths
$frontendPath = Join-Path $scriptDir "isl-frontend"
$backendPath = Join-Path $scriptDir "isl-backend"
$venvPath = Join-Path $scriptDir ".venv\Scripts\Activate.ps1"

# Check if directories exist
if (-not (Test-Path $frontendPath)) {
    Write-Host "❌ Frontend directory not found!" -ForegroundColor Red
    exit 1
}

if (-not (Test-Path $backendPath)) {
    Write-Host "❌ Backend directory not found!" -ForegroundColor Red
    exit 1
}

# Start Backend in new window
Write-Host "📦 Starting Backend Server..." -ForegroundColor Green
$backendScript = @"
& '$venvPath'
cd '$backendPath'
python run.py
"@

Start-Process powershell -ArgumentList "-NoExit", "-Command", $backendScript

# Wait a bit for backend to start
Write-Host "⏳ Waiting for backend to initialize..." -ForegroundColor Yellow
Start-Sleep -Seconds 3

# Start Frontend in new window
Write-Host "🎨 Starting Frontend Server..." -ForegroundColor Green
$frontendScript = @"
cd '$frontendPath'
npm run dev
"@

Start-Process powershell -ArgumentList "-NoExit", "-Command", $frontendScript

Write-Host ""
Write-Host "============================================================" -ForegroundColor Cyan
Write-Host "✅ Both servers are starting!" -ForegroundColor Green
Write-Host "============================================================" -ForegroundColor Cyan
Write-Host ""
Write-Host "📍 Frontend: http://localhost:3000" -ForegroundColor Yellow
Write-Host "📍 Backend:  http://localhost:5000" -ForegroundColor Yellow
Write-Host "📍 API Docs: http://localhost:5000/docs" -ForegroundColor Yellow
Write-Host ""
Write-Host "💡 Two new PowerShell windows will open for each server" -ForegroundColor Cyan
Write-Host "💡 Close those windows to stop the servers" -ForegroundColor Cyan
Write-Host ""
Write-Host "Press any key to exit this window..." -ForegroundColor Gray
$null = $Host.UI.RawUI.ReadKey("NoEcho,IncludeKeyDown")
