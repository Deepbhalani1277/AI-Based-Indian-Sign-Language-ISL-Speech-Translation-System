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
from app.services.gemini_service import gemini_service
import time

router = APIRouter(prefix="/api", tags=["Translation"])

@router.post("/process-gesture", response_model=GestureProcessResponse)
async def process_gesture(request: GestureProcessRequest, db: Session = Depends(get_db)):
    """
    Process gesture image and return recognized text with AI enhancement
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
        
        # Prepare base response
        response_data = {
            "success": True,
            "text": predicted_text,
            "confidence": confidence
        }
        
        # If sentence generation is enabled, use Gemini AI
        if request.generate_sentence:
            # For now, we'll treat single gesture as a word
            # In real implementation, you'd accumulate words from multiple gestures
            words = [predicted_text]
            
            # Generate sentence and translate using Gemini
            gemini_result = gemini_service.generate_and_translate(
                words=words,
                target_language=request.language or "english"
            )
            
            if gemini_result["success"]:
                response_data["generated_sentence"] = gemini_result["generated_sentence"]
                response_data["translated_text"] = gemini_result["translated_text"]
                response_data["target_language"] = gemini_result["target_language"]
        
        # Save to translation history
        try:
            translation_record = TranslationHistory(
                user_id=1,  # TODO: Replace with actual authenticated user_id when auth is implemented
                type="sign-to-speech",
                input_data=predicted_text,
                output_data=response_data.get("translated_text") or response_data.get("generated_sentence") or predicted_text,
                confidence_score=confidence,
                duration_ms=duration_ms
            )
            db.add(translation_record)
            db.commit()
            print(f"✅ Translation saved to database (ID: {translation_record.id})")
        except Exception as db_error:
            print(f"⚠️  Failed to save to database: {db_error}")
            # Don't fail the request if database save fails
            db.rollback()
        
        return GestureProcessResponse(**response_data)
        
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
        
        
        # Save to translation history
        try:
            translation_record = TranslationHistory(
                user_id=1,  # TODO: Replace with actual authenticated user_id when auth is implemented
                type="speech-to-sign",
                input_data=request.text,
                output_data=", ".join(gestures),  # Store gestures as comma-separated string
                confidence_score=None,  # No confidence score for speech-to-sign
                duration_ms=None
            )
            db.add(translation_record)
            db.commit()
            print(f"✅ Translation saved to database (ID: {translation_record.id})")
        except Exception as db_error:
            print(f"⚠️  Failed to save to database: {db_error}")
            # Don't fail the request if database save fails
            db.rollback()
        
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
