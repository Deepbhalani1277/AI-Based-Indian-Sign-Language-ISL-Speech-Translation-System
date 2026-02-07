@echo off
echo Starting ISL Backend Server...
cd /d "%~dp0"
call .venv\Scripts\activate.bat
cd isl-backend
python run.py
