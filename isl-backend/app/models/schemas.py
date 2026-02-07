from pydantic import BaseModel, EmailStr, Field
from typing import Optional, List
from datetime import datetime

# User Schemas
class UserBase(BaseModel):
    email: EmailStr
    name: str

class UserCreate(UserBase):
    password: str = Field(..., min_length=6)

class UserLogin(BaseModel):
    email: EmailStr
    password: str

class UserResponse(UserBase):
    id: int
    avatar_url: Optional[str] = None
    created_at: datetime
    
    class Config:
        from_attributes = True

class Token(BaseModel):
    access_token: str
    token_type: str = "bearer"
    user: UserResponse

# Translation Schemas
class TranslationCreate(BaseModel):
    type: str  # 'sign-to-speech' or 'speech-to-sign'
    input_data: Optional[str] = None
    output_data: Optional[str] = None
    confidence_score: Optional[float] = None
    duration_ms: Optional[int] = None

class TranslationResponse(BaseModel):
    id: int
    user_id: int
    type: str
    input_data: Optional[str]
    output_data: Optional[str]
    confidence_score: Optional[float]
    duration_ms: Optional[int]
    created_at: datetime
    
    class Config:
        from_attributes = True

# Feedback Schemas
class FeedbackCreate(BaseModel):
    translation_id: Optional[int] = None
    rating: int = Field(..., ge=1, le=5)
    comment: Optional[str] = None

class FeedbackResponse(BaseModel):
    id: int
    user_id: Optional[int]
    translation_id: Optional[int]
    rating: int
    comment: Optional[str]
    created_at: datetime
    
    class Config:
        from_attributes = True

# Gesture Processing Schemas
class GestureProcessRequest(BaseModel):
    image: str  # Base64 encoded image

class GestureProcessResponse(BaseModel):
    success: bool
    text: Optional[str] = None
    confidence: Optional[float] = None
    error: Optional[str] = None

class SpeechToSignRequest(BaseModel):
    text: str

class SpeechToSignResponse(BaseModel):
    success: bool
    gestures: Optional[List[str]] = None
    animations: Optional[List[str]] = None
    error: Optional[str] = None
