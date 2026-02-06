import React, { useState } from 'react';
import './SpeechToSign.css';

const SpeechToSign = () => {
    const [inputMode, setInputMode] = useState('voice'); // 'voice' or 'text'
    const [textInput, setTextInput] = useState('');
    const [isRecording, setIsRecording] = useState(false);

    const handleStartRecording = () => {
        setIsRecording(true);
        // Placeholder for actual recording logic
    };

    const handleStopRecording = () => {
        setIsRecording(false);
    };

    const handleConvert = () => {
        // Placeholder for conversion logic
        console.log('Converting text to ISL:', textInput);
    };

    return (
        <div className="speech-to-sign-page">
            <div className="page-header">
                <h1>Speech/Text to ISL Translation</h1>
                <p className="page-subtitle">Convert speech or text into Indian Sign Language gestures</p>
            </div>

            {/* Toggle Buttons */}
            <div className="mode-toggle">
                <button
                    className={`toggle-btn ${inputMode === 'voice' ? 'active' : ''}`}
                    onClick={() => setInputMode('voice')}
                >
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M12 1a3 3 0 0 0-3 3v8a3 3 0 0 0 6 0V4a3 3 0 0 0-3-3z" fill="currentColor" />
                        <path d="M19 10v2a7 7 0 0 1-14 0v-2M12 19v4M8 23h8" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                    </svg>
                    Voice Input
                </button>
                <button
                    className={`toggle-btn ${inputMode === 'text' ? 'active' : ''}`}
                    onClick={() => setInputMode('text')}
                >
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M4 7h16M4 12h16M4 17h10" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                    </svg>
                    Text Input
                </button>
            </div>

            {/* Main Content */}
            <div className="content-grid">
                {/* Left Column - Input */}
                <div className="input-section">
                    <div className="card">
                        <h3>Input</h3>

                        {inputMode === 'voice' ? (
                            <div className="voice-input">
                                <div className="mic-container">
                                    <div className={`mic-icon-large ${isRecording ? 'recording' : ''}`}>
                                        <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <path d="M12 1a3 3 0 0 0-3 3v8a3 3 0 0 0 6 0V4a3 3 0 0 0-3-3z" fill="currentColor" />
                                            <path d="M19 10v2a7 7 0 0 1-14 0v-2M12 19v4M8 23h8" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                                        </svg>
                                    </div>
                                </div>
                                <button
                                    className="btn btn-teal btn-large"
                                    onClick={isRecording ? handleStopRecording : handleStartRecording}
                                >
                                    {isRecording ? 'Stop Recording' : 'Start Recording'}
                                </button>
                            </div>
                        ) : (
                            <div className="text-input">
                                <textarea
                                    className="form-input text-area-large"
                                    placeholder="Type your message here..."
                                    value={textInput}
                                    onChange={(e) => setTextInput(e.target.value)}
                                />
                                <button
                                    className="btn btn-teal btn-large"
                                    onClick={handleConvert}
                                    disabled={!textInput.trim()}
                                >
                                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M13 10V3L4 14h7v7l9-11h-7z" fill="currentColor" />
                                    </svg>
                                    Convert to ISL
                                </button>
                            </div>
                        )}
                    </div>
                </div>

                {/* Right Column - ISL Gesture Representation */}
                <div className="output-section">
                    <div className="card">
                        <h3>
                            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M7 13C7 11.8954 7.89543 11 9 11C10.1046 11 11 11.8954 11 13V17C11 18.1046 10.1046 19 9 19C7.89543 19 7 18.1046 7 17V13Z" fill="currentColor" />
                                <path d="M13 9C13 7.89543 13.8954 7 15 7C16.1046 7 17 7.89543 17 9V17C17 18.1046 16.1046 19 15 19C13.8954 19 13 18.1046 13 17V9Z" fill="currentColor" />
                                <path d="M9 7C9 5.89543 9.89543 5 11 5C12.1046 5 13 5.89543 13 7V13C13 14.1046 12.1046 15 11 15C9.89543 15 9 14.1046 9 13V7Z" fill="currentColor" />
                            </svg>
                            ISL Gesture Representation
                        </h3>
                        <div className="gesture-placeholder">
                            <svg className="hand-icon" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M7 13C7 11.8954 7.89543 11 9 11C10.1046 11 11 11.8954 11 13V17C11 18.1046 10.1046 19 9 19C7.89543 19 7 18.1046 7 17V13Z" fill="currentColor" opacity="0.3" />
                                <path d="M13 9C13 7.89543 13.8954 7 15 7C16.1046 7 17 7.89543 17 9V17C17 18.1046 16.1046 19 15 19C13.8954 19 13 18.1046 13 17V9Z" fill="currentColor" opacity="0.3" />
                                <path d="M9 7C9 5.89543 9.89543 5 11 5C12.1046 5 13 5.89543 13 7V13C13 14.1046 12.1046 15 11 15C9.89543 15 9 14.1046 9 13V7Z" fill="currentColor" opacity="0.3" />
                            </svg>
                            <p className="placeholder-title">No gestures to display</p>
                            <p className="placeholder-subtitle">Convert speech or text to see ISL gestures</p>
                        </div>
                    </div>
                </div>
            </div>

            {/* How to Use Section */}
            <div className="how-to-use">
                <div className="info-card">
                    <h4>How to Use:</h4>
                    <ul>
                        <li>Choose between voice input (microphone) or text input</li>
                        <li>For voice: Click "Start Recording" and speak clearly</li>
                        <li>For text: Type your message and click "Convert to ISL"</li>
                        <li>The system will show step-by-step gesture descriptions</li>
                    </ul>
                </div>
            </div>
        </div>
    );
};

export default SpeechToSign;
