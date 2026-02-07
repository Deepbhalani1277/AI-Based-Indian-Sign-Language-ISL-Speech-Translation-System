import React, { useState, useRef, useEffect } from 'react';
import useCamera from '../hooks/useCamera';
import './SignToSpeech.css';

const SignToSpeech = () => {
    const videoRef = useRef(null);
    const { stream, isActive, startCamera, stopCamera } = useCamera();
    const [isRecognizing, setIsRecognizing] = useState(false);
    const [outputLanguage, setOutputLanguage] = useState('english');
    const [liveVoice, setLiveVoice] = useState(false);
    const [translatedText, setTranslatedText] = useState('');

    // Update video element when stream changes
    useEffect(() => {
        if (videoRef.current && stream) {
            videoRef.current.srcObject = stream;
        }
    }, [stream]);

    const handleToggleCamera = async () => {
        if (isActive) {
            stopCamera();
            setIsRecognizing(false);
        } else {
            await startCamera();
        }
    };

    const handleStartRecognition = () => {
        setIsRecognizing(true);
        setTranslatedText('Recognition started... (Model will be added later)');
        // TODO: Add gesture recognition logic here when model is ready
    };

    const handleStopRecognition = () => {
        setIsRecognizing(false);
        setTranslatedText('Recognition stopped');
    };

    return (
        <div className="sign-to-speech-page">
            <div className="page-header">
                <h1>ISL to Speech Translation</h1>
                <p className="page-subtitle">Convert Indian Sign Language gestures into spoken words</p>
            </div>

            <div className="content-grid">
                {/* Left Column - Camera Feed */}
                <div className="camera-section">
                    <div className="card">
                        <div className="camera-feed">
                            {!isActive ? (
                                <div className="camera-placeholder">
                                    <svg className="camera-icon-large" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M23 7l-7 5 7 5V7z" fill="currentColor" opacity="0.3" />
                                        <rect x="1" y="5" width="15" height="14" rx="2" fill="currentColor" opacity="0.3" />
                                        <line x1="1" y1="1" x2="23" y2="23" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                                    </svg>
                                    <p className="placeholder-title">Camera is off</p>
                                    <p className="placeholder-subtitle">Click the button below to start</p>
                                </div>
                            ) : (
                                <div className="camera-active">
                                    <video
                                        ref={videoRef}
                                        autoPlay
                                        playsInline
                                        muted
                                        style={{
                                            width: '100%',
                                            height: '100%',
                                            objectFit: 'cover',
                                            borderRadius: '8px'
                                        }}
                                    />
                                    {isRecognizing && (
                                        <div className="recording-indicator">
                                            <span className="rec-dot"></span>
                                            REC
                                        </div>
                                    )}
                                </div>
                            )}
                        </div>

                        <div className="camera-controls">
                            <button
                                className="btn btn-teal btn-large"
                                onClick={handleToggleCamera}
                            >
                                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M23 7l-7 5 7 5V7z" fill="currentColor" />
                                    <rect x="1" y="5" width="15" height="14" rx="2" fill="currentColor" />
                                </svg>
                                {isActive ? 'Turn Off Camera' : 'Turn On Camera'}
                            </button>
                            <button
                                className="btn btn-primary btn-large"
                                onClick={isRecognizing ? handleStopRecognition : handleStartRecognition}
                                disabled={!isActive}
                            >
                                {isRecognizing ? 'Stop Recognition' : 'Start Recognition'}
                            </button>
                        </div>
                    </div>
                </div>

                {/* Right Column - Settings & Output */}
                <div className="settings-section">
                    <div className="card">
                        <h3>Settings</h3>

                        <div className="form-group">
                            <label className="form-label">Output Language</label>
                            <select
                                className="form-input"
                                value={outputLanguage}
                                onChange={(e) => setOutputLanguage(e.target.value)}
                                style={{ paddingLeft: '1rem' }}
                            >
                                <option value="english">English</option>
                                <option value="hindi">Hindi</option>
                                <option value="marathi">Marathi</option>
                                <option value="gujarati">Gujarati</option>
                            </select>
                        </div>

                        <div className="toggle-setting">
                            <div>
                                <h4>Enable Live Voice Output</h4>
                                <p>Automatically speak translated text</p>
                            </div>
                            <label className="switch">
                                <input
                                    type="checkbox"
                                    checked={liveVoice}
                                    onChange={(e) => setLiveVoice(e.target.checked)}
                                />
                                <span className="slider"></span>
                            </label>
                        </div>

                        <div className="translation-output">
                            <h4>Translation Output</h4>
                            <div className="output-box">
                                {translatedText ? (
                                    <p className="output-text">{translatedText}</p>
                                ) : (
                                    <>
                                        <p className="output-placeholder">No translation yet</p>
                                        <p className="output-placeholder-sub">Start recognition to see results</p>
                                    </>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default SignToSpeech;
