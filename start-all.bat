@echo off
REM ISL Translation System - Startup Script (Batch version)
REM This script starts both frontend and backend servers

echo ============================================================
echo Starting ISL Translation System
echo ============================================================
echo.

REM Start Backend
echo Starting Backend Server...
start "ISL Backend" powershell -NoExit -Command "& '%~dp0.venv\Scripts\Activate.ps1'; cd '%~dp0isl-backend'; python run.py"

REM Wait for backend to start
timeout /t 3 /nobreak > nul

REM Start Frontend
echo Starting Frontend Server...
start "ISL Frontend" powershell -NoExit -Command "cd '%~dp0isl-frontend'; npm run dev"

echo.
echo ============================================================
echo Both servers are starting!
echo ============================================================
echo.
echo Frontend: http://localhost:3000
echo Backend:  http://localhost:5000
echo API Docs: http://localhost:5000/docs
echo.
echo Two new windows will open for each server.
echo Close those windows to stop the servers.
echo.
pause
