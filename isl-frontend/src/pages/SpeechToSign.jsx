import React, { useState, useRef, useEffect } from 'react';
import api from '../services/api';
import './SpeechToSign.css';

const SpeechToSign = () => {
    const [inputMode, setInputMode] = useState('voice'); // 'voice' or 'text'
    const [textInput, setTextInput] = useState('');
    const [isRecording, setIsRecording] = useState(false);
    const [transcript, setTranscript] = useState('');
    const [gestures, setGestures] = useState([]);
    const [error, setError] = useState('');
    const recognitionRef = useRef(null);

    // Initialize speech recognition
    useEffect(() => {
        if ('webkitSpeechRecognition' in window || 'SpeechRecognition' in window) {
            const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
            recognitionRef.current = new SpeechRecognition();
            recognitionRef.current.continuous = true;
            recognitionRef.current.interimResults = true;
            recognitionRef.current.lang = 'en-US';

            recognitionRef.current.onresult = (event) => {
                let finalTranscript = '';
                for (let i = event.resultIndex; i < event.results.length; i++) {
                    const transcriptPiece = event.results[i][0].transcript;
                    if (event.results[i].isFinal) {
                        finalTranscript += transcriptPiece + ' ';
                    }
                }
                if (finalTranscript) {
                    setTranscript(prev => prev + finalTranscript);
                }
            };

            recognitionRef.current.onerror = (event) => {
                console.error('Speech recognition error:', event.error);
                setError(`Speech recognition error: ${event.error}`);
                setIsRecording(false);
            };

            recognitionRef.current.onend = () => {
                setIsRecording(false);
            };
        } else {
            setError('Speech recognition is not supported in this browser. Please use Chrome or Edge.');
        }

        return () => {
            if (recognitionRef.current) {
                recognitionRef.current.stop();
            }
        };
    }, []);

    const handleStartRecording = () => {
        if (recognitionRef.current) {
            setTranscript('');
            setError('');
            setGestures([]);
            recognitionRef.current.start();
            setIsRecording(true);
        }
    };

    const handleStopRecording = () => {
        if (recognitionRef.current) {
            recognitionRef.current.stop();
            setIsRecording(false);
            // Convert the transcript to ISL
            if (transcript.trim()) {
                handleConvertToISL(transcript);
            }
        }
    };

    const handleConvert = () => {
        if (textInput.trim()) {
            handleConvertToISL(textInput);
        }
    };

    const handleConvertToISL = async (text) => {
        try {
            setError('');
            const response = await api.convertSpeechToSign(text);
            if (response.success) {
                setGestures(response.gestures || []);
            } else {
                setError(response.error || 'Failed to convert to ISL');
            }
        } catch (err) {
            console.error('Error converting to ISL:', err);
            setError('Failed to connect to server. Please check if backend is running.');
        }
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

            {/* Error Message */}
            {error && (
                <div className="error-message" style={{
                    background: '#fee',
                    border: '1px solid #fcc',
                    padding: '1rem',
                    borderRadius: '8px',
                    color: '#c33',
                    margin: '1rem auto',
                    maxWidth: '1400px'
                }}>
                    {error}
                </div>
            )}

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
                                    {isRecording && <p style={{ color: '#ef4444', fontWeight: 600, marginTop: '1rem' }}>Listening...</p>}
                                </div>

                                {/* Show transcript */}
                                {transcript && (
                                    <div style={{
                                        background: '#f3f4f6',
                                        padding: '1rem',
                                        borderRadius: '8px',
                                        marginBottom: '1rem',
                                        minHeight: '60px'
                                    }}>
                                        <p style={{ margin: 0, color: '#374151' }}>{transcript}</p>
                                    </div>
                                )}

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

                        {gestures.length > 0 ? (
                            <div className="gestures-list" style={{
                                padding: '1rem',
                                background: '#f9fafb',
                                borderRadius: '8px',
                                maxHeight: '400px',
                                overflowY: 'auto'
                            }}>
                                <h4 style={{ marginBottom: '1rem', color: '#0d9488' }}>Gestures to perform:</h4>
                                <ol style={{ paddingLeft: '1.5rem', margin: 0 }}>
                                    {gestures.map((gesture, index) => (
                                        <li key={index} style={{
                                            padding: '0.75rem',
                                            marginBottom: '0.5rem',
                                            background: 'white',
                                            borderRadius: '6px',
                                            border: '1px solid #e5e7eb'
                                        }}>
                                            <strong>{gesture}</strong>
                                        </li>
                                    ))}
                                </ol>
                            </div>
                        ) : (
                            <div className="gesture-placeholder">
                                <svg className="hand-icon" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M7 13C7 11.8954 7.89543 11 9 11C10.1046 11 11 11.8954 11 13V17C11 18.1046 10.1046 19 9 19C7.89543 19 7 18.1046 7 17V13Z" fill="currentColor" opacity="0.3" />
                                    <path d="M13 9C13 7.89543 13.8954 7 15 7C16.1046 7 17 7.89543 17 9V17C17 18.1046 16.1046 19 15 19C13.8954 19 13 18.1046 13 17V9Z" fill="currentColor" opacity="0.3" />
                                    <path d="M9 7C9 5.89543 9.89543 5 11 5C12.1046 5 13 5.89543 13 7V13C13 14.1046 12.1046 15 11 15C9.89543 15 9 14.1046 9 13V7Z" fill="currentColor" opacity="0.3" />
                                </svg>
                                <p className="placeholder-title">No gestures to display</p>
                                <p className="placeholder-subtitle">Convert speech or text to see ISL gestures</p>
                            </div>
                        )}
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
