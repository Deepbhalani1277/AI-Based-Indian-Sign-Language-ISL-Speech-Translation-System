# ISL Backend

AI-Based Indian Sign Language (ISL) Speech Translation System - Backend API

## 🚀 Features

- ✅ User Authentication (JWT-based)
- ✅ Real-time Gesture Recognition
- ✅ Speech-to-Sign Conversion
- ✅ Translation History
- ✅ Feedback System
- ✅ RESTful API with FastAPI
- ✅ PostgreSQL Database
- ✅ MediaPipe Integration

## 📋 Prerequisites

- Python 3.10+
- PostgreSQL 15+
- Virtual Environment (already created)

## 🛠️ Installation

### 1. Activate Virtual Environment

```bash
# Windows PowerShell
.\.venv\Scripts\Activate.ps1

# Windows CMD
.\.venv\Scripts\activate.bat
```

### 2. Install Dependencies

```bash
cd isl-backend
pip install -r requirements.txt
```

### 3. Configure Environment

Edit `.env` file with your database credentials:

```env
DATABASE_URL=postgresql://postgres:admin123@localhost:5432/isl_database
```

### 4. Initialize Database

The database tables will be created automatically on first run.

### 5. Run the Server

```bash
python run.py
```

The server will start at: **http://localhost:5000**

## 📚 API Documentation

Once the server is running, visit:
- **Swagger UI**: http://localhost:5000/docs
- **ReDoc**: http://localhost:5000/redoc

## 🗂️ Project Structure

```
isl-backend/
├── app/
│   ├── __init__.py
│   ├── main.py              # FastAPI application
│   ├── config.py            # Configuration
│   ├── models/              # Database & Pydantic models
│   │   ├── database.py      # SQLAlchemy models
│   │   └── schemas.py       # Pydantic schemas
│   ├── routes/              # API endpoints
│   │   ├── auth.py          # Authentication
│   │   ├── translation.py   # Gesture processing
│   │   └── feedback.py      # Feedback
│   ├── services/            # Business logic
│   │   └── ml_service.py    # ML model integration
│   └── utils/               # Utilities
│       ├── database.py      # DB connection
│       ├── auth.py          # JWT & password
│       └── helpers.py       # Helper functions
├── ml_models/               # Trained ML models (add yours here)
├── uploads/                 # File uploads
├── .env                     # Environment variables
├── requirements.txt         # Python dependencies
└── run.py                   # Run script
```

## 🔌 API Endpoints

### Authentication
- `POST /api/auth/signup` - Register new user
- `POST /api/auth/login` - Login user
- `POST /api/auth/logout` - Logout user
- `GET /api/auth/me` - Get current user

### Translation
- `POST /api/process-gesture` - Process gesture image
- `POST /api/speech-to-sign` - Convert text to sign
- `GET /api/translation-history` - Get translation history

### Feedback
- `POST /api/feedback` - Submit feedback
- `GET /api/feedback` - Get all feedback

## 🤖 ML Models

Place your trained models in the `ml_models/` directory:
- `gesture_model.pkl` - Gesture recognition model
- `sign_detector.h5` - Sign detection model

The system will work with mock predictions if models are not present.

## 🔧 Development

```bash
# Install dependencies
pip install -r requirements.txt

# Run with auto-reload
python run.py

# The server will reload automatically when you make changes
```

## 📝 Environment Variables

| Variable | Description | Default |
|----------|-------------|---------|
| `DATABASE_URL` | PostgreSQL connection string | `postgresql://postgres:admin123@localhost:5432/isl_database` |
| `SECRET_KEY` | JWT secret key | Auto-generated |
| `PORT` | Server port | `5000` |
| `DEBUG` | Debug mode | `True` |
| `CORS_ORIGINS` | Allowed origins | `http://localhost:3000,http://localhost:5173` |

## 🐛 Troubleshooting

### Database Connection Error
- Ensure PostgreSQL is running
- Check database credentials in `.env`
- Verify database `isl_database` exists

### Import Errors
- Activate virtual environment
- Install all dependencies: `pip install -r requirements.txt`

### Port Already in Use
- Change `PORT` in `.env` file
- Or stop the process using port 5000

## 📄 License

MIT
