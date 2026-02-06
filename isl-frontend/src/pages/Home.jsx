import React, { useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import './Home.css';

const Home = () => {
    const { isAuthenticated } = useAuth();
    const navigate = useNavigate();

    useEffect(() => {
        if (isAuthenticated) {
            navigate('/dashboard');
        }
    }, [isAuthenticated, navigate]);

    if (isAuthenticated) {
        return null;
    }

    return (
        <div className="home-page">
            {/* Hero Section */}
            <section className="hero-section">
                <div className="hero-container">
                    <div className="hero-content">
                        <div className="hero-badge">
                            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M13 10V3L4 14h7v7l9-11h-7z" fill="currentColor" />
                            </svg>
                            AI-Powered Translation
                        </div>
                        <h1 className="hero-title">
                            AI-Based Indian Sign Language ↔ Speech Translation
                        </h1>
                        <p className="hero-subtitle">
                            Breaking communication barriers with real-time two-way translation between Indian Sign Language and speech. Making conversations accessible for everyone.
                        </p>
                        <Link to="/signup" className="btn btn-primary btn-large hero-cta">
                            Get Started
                            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M5 12h14M12 5l7 7-7 7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                            </svg>
                        </Link>
                    </div>

                    <div className="hero-illustration">
                        <div className="illustration-card">
                            <div className="illustration-header">
                                <div className="illustration-icon">
                                    <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M7 13C7 11.8954 7.89543 11 9 11C10.1046 11 11 11.8954 11 13V17C11 18.1046 10.1046 19 9 19C7.89543 19 7 18.1046 7 17V13Z" fill="currentColor" />
                                        <path d="M13 9C13 7.89543 13.8954 7 15 7C16.1046 7 17 7.89543 17 9V17C17 18.1046 16.1046 19 15 19C13.8954 19 13 18.1046 13 17V9Z" fill="currentColor" />
                                        <path d="M9 7C9 5.89543 9.89543 5 11 5C12.1046 5 13 5.89543 13 7V13C13 14.1046 12.1046 15 11 15C9.89543 15 9 14.1046 9 13V7Z" fill="currentColor" />
                                    </svg>
                                </div>
                                <div>
                                    <h3>ISL Gesture</h3>
                                    <p>Hand signs detected</p>
                                </div>
                                <svg className="camera-icon" width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M23 7l-7 5 7 5V7z" fill="currentColor" />
                                    <rect x="1" y="5" width="15" height="14" rx="2" fill="currentColor" />
                                </svg>
                            </div>

                            <div className="loading-dots">
                                <span></span>
                                <span></span>
                                <span></span>
                            </div>

                            <div className="illustration-footer">
                                <div className="speech-icon">
                                    <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" fill="currentColor" />
                                    </svg>
                                </div>
                                <div>
                                    <h4>Speech Output</h4>
                                    <p>Real-time translation</p>
                                </div>
                                <svg className="mic-icon" width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M12 1a3 3 0 0 0-3 3v8a3 3 0 0 0 6 0V4a3 3 0 0 0-3-3z" fill="currentColor" />
                                    <path d="M19 10v2a7 7 0 0 1-14 0v-2M12 19v4M8 23h8" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                                </svg>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* How It Works Section */}
            <section className="how-it-works">
                <h2>How It Works</h2>
                <p className="section-subtitle">Simple, fast, and accurate translation in three steps</p>

                <div className="features-grid">
                    <div className="feature-card">
                        <div className="feature-number">1</div>
                        <div className="feature-icon">
                            <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M23 7l-7 5 7 5V7z" fill="currentColor" />
                                <rect x="1" y="5" width="15" height="14" rx="2" fill="currentColor" />
                            </svg>
                        </div>
                        <h3>Choose Your Mode</h3>
                        <p>Select between ISL to Speech or Speech/Text to ISL translation based on your needs</p>
                    </div>

                    <div className="feature-card">
                        <div className="feature-number">2</div>
                        <div className="feature-icon">
                            <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M13 10V3L4 14h7v7l9-11h-7z" fill="currentColor" />
                            </svg>
                        </div>
                        <h3>AI Processing</h3>
                        <p>Our advanced AI analyzes gestures or speech in real-time with high accuracy</p>
                    </div>

                    <div className="feature-card">
                        <div className="feature-number">3</div>
                        <div className="feature-icon">
                            <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" fill="currentColor" />
                            </svg>
                        </div>
                        <h3>Get Results</h3>
                        <p>Receive instant translations with visual gestures or spoken output</p>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default Home;
