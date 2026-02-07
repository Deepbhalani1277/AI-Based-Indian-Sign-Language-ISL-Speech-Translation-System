from pydantic_settings import BaseSettings
from pydantic import Field
from typing import List
import os
from dotenv import load_dotenv

load_dotenv()

class Settings(BaseSettings):
    # Database
    DATABASE_URL: str = "postgresql://postgres:admin123@localhost:5432/isl_database"
    
    # JWT
    SECRET_KEY: str = "09d25e094faa6ca2556c818166b7a9563b93f7099f6f0f4caa6cf63b88e8d3e7"
    ALGORITHM: str = "HS256"
    ACCESS_TOKEN_EXPIRE_MINUTES: int = 30
    
    # Server
    HOST: str = "0.0.0.0"
    PORT: int = 5000
    DEBUG: bool = True
    
    # CORS - Use list directly
    CORS_ORIGINS: List[str] = ["http://localhost:3000", "http://localhost:5173"]
    
    # Google Gemini API
    GEMINI_API_KEY: str = "AIzaSyB78kK5WFv6lDEb85bxTqyuzcEYShUGmac"
    
    # File Upload
    MAX_FILE_SIZE: int = 10485760
    UPLOAD_DIR: str = "uploads"
    
    # ML Models
    GESTURE_MODEL_PATH: str = "ml_models/gesture_model.pkl"
    SIGN_DETECTOR_PATH: str = "ml_models/sign_detector.h5"
    
    class Config:
        env_file = ".env"
        env_file_encoding = 'utf-8'

settings = Settings()
