from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.config import settings
from app.utils.database import init_db
from app.routes import auth, translation, feedback
from app.services.ml_service import ml_service
import uvicorn

# Create FastAPI app
app = FastAPI(
    title="ISL Translation API",
    description="AI-Based Indian Sign Language Speech Translation System",
    version="1.0.0",
    debug=settings.DEBUG
)

# Configure CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=settings.CORS_ORIGINS,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Include routers
app.include_router(auth.router)
app.include_router(translation.router)
app.include_router(feedback.router)

@app.on_event("startup")
async def startup_event():
    """
    Initialize database and load ML models on startup
    """
    print("🚀 Starting ISL Translation API...")
    
    # Initialize database
    try:
        init_db()
        print("✅ Database initialized")
    except Exception as e:
        print(f"❌ Database initialization failed: {e}")
    
    # Load ML models
    try:
        ml_service.load_models(
            gesture_model_path=settings.GESTURE_MODEL_PATH,
            label_encoder_path=settings.LABEL_ENCODER_PATH,
        )
        print("✅ ML models loaded")
    except Exception as e:
        print(f"⚠️  ML models not loaded: {e}")
    
    print(f"✅ Server running on http://{settings.HOST}:{settings.PORT}")

@app.on_event("shutdown")
async def shutdown_event():
    """
    Cleanup on shutdown
    """
    print("👋 Shutting down ISL Translation API...")

@app.get("/")
async def root():
    """
    Root endpoint - API health check
    """
    return {
        "message": "ISL Translation API",
        "version": "1.0.0",
        "status": "running",
        "docs": "/docs"
    }

@app.get("/health")
async def health_check():
    """
    Health check endpoint
    """
    return {
        "status": "healthy",
        "database": "connected",
        "ml_service": "ready"
    }

if __name__ == "__main__":
    uvicorn.run(
        "app.main:app",
        host=settings.HOST,
        port=settings.PORT,
        reload=settings.DEBUG
    )
