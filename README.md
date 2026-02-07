# AI-Based Indian Sign Language (ISL) Speech Translation System

A full-stack web application for real-time Indian Sign Language translation with AI-powered gesture recognition.

## 🚀 Quick Start

### **Option 1: Start Both Servers (Recommended)**

**Double-click one of these files:**
- `start-all.bat` (Windows Batch)
- `start-all.ps1` (PowerShell - right-click → Run with PowerShell)

This will automatically start both frontend and backend servers!

### **Option 2: Start Servers Manually**

**Terminal 1 - Backend:**
```bash
cd isl-backend
& "..\..venv\Scripts\Activate.ps1"
python run.py
```

**Terminal 2 - Frontend:**
```bash
cd isl-frontend
npm run dev
```

## 📍 Access the Application

- **Frontend**: http://localhost:3000
- **Backend API**: http://localhost:5000
- **API Documentation**: http://localhost:5000/docs

## 🏗️ Project Structure

```
AI-Based-Indian-Sign-Language-ISL-Speech-Translation-System/
├── isl-frontend/          # React + Vite frontend
├── isl-backend/           # FastAPI backend
├── .venv/                 # Python virtual environment
├── start-all.bat          # Startup script (Batch)
├── start-all.ps1          # Startup script (PowerShell)
└── README.md              # This file
```

## ✨ Features

- 🎥 Real-time sign language recognition
- 🗣️ Speech-to-sign conversion
- 🔐 User authentication (JWT)
- 📊 Translation history
- 💬 Feedback system
- 🤖 AI-powered gesture detection (MediaPipe)

## 🛠️ Tech Stack

### Frontend
- React 18
- Vite
- React Router
- Socket.IO Client

### Backend
- FastAPI
- PostgreSQL
- SQLAlchemy
- MediaPipe
- OpenCV
- JWT Authentication

## 📋 Prerequisites

- Node.js 16+
- Python 3.10+
- PostgreSQL 15+

## 🔧 Development

### Frontend Commands
```bash
cd isl-frontend
npm run dev      # Start dev server
npm run build    # Build for production
npm run preview  # Preview production build
```

### Backend Commands
```bash
cd isl-backend
python run.py    # Start backend server
```

## 🛑 Stopping Servers

- Close the PowerShell windows that opened
- Or press `Ctrl + C` in each terminal

## 📝 Environment Variables

### Frontend (.env)
```
VITE_API_URL=http://localhost:5000
VITE_SOCKET_URL=http://localhost:5000
```

### Backend (.env)
```
DATABASE_URL=postgresql://postgres:admin123@localhost:5432/isl_database
SECRET_KEY=your-secret-key
PORT=5000
DEBUG=True
```

## 🐛 Troubleshooting

### Backend won't start
- Ensure PostgreSQL is running
- Check database credentials in `isl-backend/.env`
- Activate virtual environment: `.venv\Scripts\Activate.ps1`

### Frontend won't start
- Run `npm install` in `isl-frontend/`
- Check if port 3000 is available

### Database connection error
- Verify PostgreSQL is running
- Check database `isl_database` exists
- Verify password in `.env` file

## 📄 License

MIT

## 👥 Contributors

Your Name

---

**Need help?** Check the API documentation at http://localhost:5000/docs