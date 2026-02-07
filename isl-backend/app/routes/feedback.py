from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session
from app.models.schemas import FeedbackCreate, FeedbackResponse
from app.models.database import Feedback
from app.utils.database import get_db

router = APIRouter(prefix="/api/feedback", tags=["Feedback"])

@router.post("/", response_model=FeedbackResponse, status_code=status.HTTP_201_CREATED)
async def submit_feedback(
    feedback_data: FeedbackCreate,
    db: Session = Depends(get_db)
):
    """
    Submit feedback for a translation
    TODO: Add user authentication to get user_id
    """
    # Create feedback
    new_feedback = Feedback(
        user_id=None,  # Will be set when authentication is added
        translation_id=feedback_data.translation_id,
        rating=feedback_data.rating,
        comment=feedback_data.comment
    )
    
    db.add(new_feedback)
    db.commit()
    db.refresh(new_feedback)
    
    return new_feedback

@router.get("/", response_model=list[FeedbackResponse])
async def get_all_feedback(
    limit: int = 100,
    db: Session = Depends(get_db)
):
    """
    Get all feedback (admin only in production)
    """
    feedbacks = db.query(Feedback)\
        .order_by(Feedback.created_at.desc())\
        .limit(limit)\
        .all()
    
    return feedbacks
