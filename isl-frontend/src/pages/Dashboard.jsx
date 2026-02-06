import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useTranslation } from '../context/TranslationContext';
import TranslationHistory from '../components/dashboard/TranslationHistory';
import ConfirmModal from '../components/common/ConfirmModal';
import './Dashboard.css';

const Dashboard = () => {
    const { user } = useAuth();
    const { clearAllHistory } = useTranslation();
    const navigate = useNavigate();
    const [showClearModal, setShowClearModal] = useState(false);

    const handleClearAll = () => {
        clearAllHistory();
        setShowClearModal(false);
    };

    return (
        <div className="dashboard-container">
            {/* Welcome Section */}
            <section className="welcome-section">
                <h1>Welcome back, {user?.name}! 👋</h1>
                <p>Choose a translation mode to get started</p>
            </section>

            {/* Quick Actions */}
            <section className="quick-actions">
                <div className="action-card" onClick={() => navigate('/sign-to-speech')}>
                    <div className="action-icon">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
                        </svg>
                    </div>
                    <h2>ISL to Speech</h2>
                    <p>Convert Indian Sign Language gestures into spoken language.</p>
                    <button className="btn btn-primary">Start Camera</button>
                </div>

                <div className="action-card" onClick={() => navigate('/speech-to-sign')}>
                    <div className="action-icon">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 01-3-3V5a3 3 0 116 0v6a3 3 0 01-3 3z" />
                        </svg>
                    </div>
                    <h2>Speech/Text to ISL</h2>
                    <p>Convert speech or text into Indian Sign Language gestures.</p>
                    <button className="btn btn-primary">Start Translation</button>
                </div>
            </section>

            {/* Past Translation History */}
            <section className="history-section">
                <div className="history-header">
                    <h2>Past Translations</h2>
                    <button
                        className="btn btn-outline"
                        onClick={() => setShowClearModal(true)}
                    >
                        Clear All
                    </button>
                </div>
                <TranslationHistory />
            </section>

            {/* Confirm Modal */}
            {showClearModal && (
                <ConfirmModal
                    title="Clear All History"
                    message="Are you sure you want to delete all translation history? This action cannot be undone."
                    onConfirm={handleClearAll}
                    onCancel={() => setShowClearModal(false)}
                />
            )}
        </div>
    );
};

export default Dashboard;
