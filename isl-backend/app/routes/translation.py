from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session
from app.models.schemas import (
    GestureProcessRequest, 
    GestureProcessResponse,
    SpeechToSignRequest,
    SpeechToSignResponse,
    TranslationCreate,
    TranslationResponse
)
from app.models.database import TranslationHistory
from app.utils.database import get_db
from app.utils.helpers import decode_base64_image
from app.services.ml_service import ml_service
import time

router = APIRouter(prefix="/api", tags=["Translation"])

@router.post("/process-gesture", response_model=GestureProcessResponse)
async def process_gesture(request: GestureProcessRequest, db: Session = Depends(get_db)):
    """
    Process gesture image and return recognized text
    """
    try:
        start_time = time.time()
        
        # Decode base64 image
        image = decode_base64_image(request.image)
        if image is None:
            raise HTTPException(
                status_code=status.HTTP_400_BAD_REQUEST,
                detail="Invalid image data"
            )
        
        # Process gesture using ML service
        predicted_text, confidence = ml_service.process_gesture(image)
        
        if predicted_text is None:
            return GestureProcessResponse(
                success=False,
                error="No hand detected in image"
            )
        
        # Calculate processing time
        duration_ms = int((time.time() - start_time) * 1000)
        
        # TODO: Save to translation history (requires user authentication)
        # For now, we'll skip saving to database
        
        return GestureProcessResponse(
            success=True,
            text=predicted_text,
            confidence=confidence
        )
        
    except Exception as e:
        print(f"Error processing gesture: {e}")
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail=f"Error processing gesture: {str(e)}"
        )

@router.post("/speech-to-sign", response_model=SpeechToSignResponse)
async def speech_to_sign(request: SpeechToSignRequest, db: Session = Depends(get_db)):
    """
    Convert text/speech to sign language gestures
    """
    try:
        if not request.text or len(request.text.strip()) == 0:
            raise HTTPException(
                status_code=status.HTTP_400_BAD_REQUEST,
                detail="Text cannot be empty"
            )
        
        # Convert text to sign gestures
        gestures = ml_service.speech_to_sign(request.text)
        
        if not gestures:
            return SpeechToSignResponse(
                success=False,
                error="Could not convert text to sign language"
            )
        
        # TODO: Save to translation history (requires user authentication)
        
        return SpeechToSignResponse(
            success=True,
            gestures=gestures,
            animations=gestures  # For now, animations are same as gestures
        )
        
    except Exception as e:
        print(f"Error converting speech to sign: {e}")
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail=f"Error converting speech to sign: {str(e)}"
        )

@router.get("/translation-history", response_model=list[TranslationResponse])
async def get_translation_history(
    limit: int = 50,
    db: Session = Depends(get_db)
):
    """
    Get translation history for current user
    TODO: Add user authentication to filter by user_id
    """
    # For now, return all translations (will be filtered by user later)
    translations = db.query(TranslationHistory)\
        .order_by(TranslationHistory.created_at.desc())\
        .limit(limit)\
        .all()
    
    return translations
