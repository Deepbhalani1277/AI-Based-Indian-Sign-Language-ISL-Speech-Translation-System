import React, { useState } from 'react';
import './Feedback.css';

const Feedback = () => {
    const [rating, setRating] = useState(0);
    const [hoverRating, setHoverRating] = useState(0);
    const [category, setCategory] = useState('');
    const [feedback, setFeedback] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await fetch('http://localhost:5000/api/feedback/', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    rating: rating,
                    comment: `[${category}] ${feedback}`,
                    translation_id: null  // Optional: link to specific translation
                })
            });

            if (response.ok) {
                // Reset form
                setRating(0);
                setCategory('');
                setFeedback('');
                alert('✅ Thank you! Your feedback has been recorded.');
            } else {
                const error = await response.json();
                alert('❌ Failed to submit feedback: ' + (error.detail || 'Unknown error'));
            }
        } catch (error) {
            console.error('Error submitting feedback:', error);
            alert('❌ Failed to connect to server. Please ensure backend is running.');
        }
    };

    return (
        <div className="feedback-page">
            <div className="feedback-container">
                <div className="feedback-card">
                    <div className="feedback-icon">
                        <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" fill="currentColor" />
                        </svg>
                    </div>

                    <h1>We Value Your Feedback</h1>
                    <p className="feedback-subtitle">Help us improve the ISL translation experience</p>

                    <form onSubmit={handleSubmit} className="feedback-form">
                        {/* Star Rating */}
                        <div className="rating-section">
                            <label className="form-label">Rate your experience</label>
                            <div className="star-rating">
                                {[1, 2, 3, 4, 5].map((star) => (
                                    <button
                                        key={star}
                                        type="button"
                                        className={`star ${star <= (hoverRating || rating) ? 'active' : ''}`}
                                        onClick={() => setRating(star)}
                                        onMouseEnter={() => setHoverRating(star)}
                                        onMouseLeave={() => setHoverRating(0)}
                                    >
                                        <svg viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                                            <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                                        </svg>
                                    </button>
                                ))}
                            </div>
                        </div>

                        {/* Category Dropdown */}
                        <div className="form-group">
                            <label className="form-label">Category</label>
                            <select
                                className="form-input"
                                value={category}
                                onChange={(e) => setCategory(e.target.value)}
                                required
                                style={{ paddingLeft: '1rem' }}
                            >
                                <option value="">Select a category</option>
                                <option value="bug">Bug Report</option>
                                <option value="feature">Feature Request</option>
                                <option value="improvement">Improvement Suggestion</option>
                                <option value="general">General Feedback</option>
                                <option value="other">Other</option>
                            </select>
                        </div>

                        {/* Feedback Textarea */}
                        <div className="form-group">
                            <label className="form-label">Your Feedback</label>
                            <textarea
                                className="form-input feedback-textarea"
                                placeholder="Tell us about your experience, suggestions for improvement, or report any issues..."
                                value={feedback}
                                onChange={(e) => setFeedback(e.target.value)}
                                required
                                rows={6}
                            />
                        </div>

                        <button type="submit" className="btn btn-gradient btn-large feedback-submit">
                            Submit Feedback
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default Feedback;
