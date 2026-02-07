import React, { useState, useRef, useEffect } from 'react';
import useCamera from '../hooks/useCamera';
import './SignToSpeech.css';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';

const SignToSpeech = () => {
    const videoRef = useRef(null);
    const canvasRef = useRef(null);
    const recognitionIntervalRef = useRef(null);

    const { stream, isActive, startCamera, stopCamera } = useCamera();
    const [isRecognizing, setIsRecognizing] = useState(false);
    const [outputLanguage, setOutputLanguage] = useState('english');
    const [liveVoice, setLiveVoice] = useState(false);
    const [detectedWords, setDetectedWords] = useState([]);
    const [generatedSentence, setGeneratedSentence] = useState('');
    const [translatedSentence, setTranslatedSentence] = useState('');
    const [currentGesture, setCurrentGesture] = useState('');
    const [confidence, setConfidence] = useState(0);
    const [isProcessing, setIsProcessing] = useState(false);

    // Update video element when stream changes
    useEffect(() => {
        if (videoRef.current && stream) {
            videoRef.current.srcObject = stream;
        }
    }, [stream]);

    // Cleanup interval on unmount
    useEffect(() => {
        return () => {
            if (recognitionIntervalRef.current) {
                clearInterval(recognitionIntervalRef.current);
            }
        };
    }, []);

    const handleToggleCamera = async () => {
        if (isActive) {
            stopCamera();
            setIsRecognizing(false);
            if (recognitionIntervalRef.current) {
                clearInterval(recognitionIntervalRef.current);
            }
        } else {
            await startCamera();
        }
    };

    const captureFrame = () => {
        if (!videoRef.current || !canvasRef.current) return null;

        const video = videoRef.current;
        const canvas = canvasRef.current;
        const context = canvas.getContext('2d');

        // Set canvas size to match video
        canvas.width = video.videoWidth;
        canvas.height = video.videoHeight;

        // Draw current video frame to canvas
        context.drawImage(video, 0, 0, canvas.width, canvas.height);

        // Convert canvas to base64 image
        return canvas.toDataURL('image/jpeg', 0.8).split(',')[1];
    };

    const processFrame = async () => {
        if (isProcessing) return; // Skip if already processing

        try {
            setIsProcessing(true);
            const frameData = captureFrame();

            if (!frameData) {
                setIsProcessing(false);
                return;
            }

            const response = await fetch(`${API_URL}/api/process-gesture`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    image: frameData,
                    language: outputLanguage,
                    generate_sentence: false // We'll generate sentence at the end
                })
            });

            const data = await response.json();

            if (data.success && data.text) {
                setCurrentGesture(data.text);
                setConfidence(data.confidence || 0);

                // Add to detected words if confidence is high enough
                if (data.confidence > 0.6) {
                    setDetectedWords(prev => {
                        // Avoid duplicates of the same word in a row
                        if (prev.length === 0 || prev[prev.length - 1] !== data.text) {
                            return [...prev, data.text];
                        }
                        return prev;
                    });
                }
            } else {
                setCurrentGesture('No hand detected');
                setConfidence(0);
            }
        } catch (error) {
            console.error('Error processing frame:', error);
        } finally {
            setIsProcessing(false);
        }
    };

    const handleStartRecognition = () => {
        setIsRecognizing(true);
        setDetectedWords([]);
        setGeneratedSentence('');
        setTranslatedSentence('');
        setCurrentGesture('Recognizing...');

        // Process frames every 1 second (adjust as needed)
        recognitionIntervalRef.current = setInterval(processFrame, 1000);
    };

    const handleStopRecognition = async () => {
        setIsRecognizing(false);
        setCurrentGesture('Processing with AI...');

        if (recognitionIntervalRef.current) {
            clearInterval(recognitionIntervalRef.current);
        }

        // Generate sentence and translate if we have detected words
        if (detectedWords.length > 0) {
            await generateAndTranslate(detectedWords);
        } else {
            setCurrentGesture('No gestures detected');
        }
    };

    const generateAndTranslate = async (words) => {
        try {
            // Use the first word's image for the API call with sentence generation
            const frameData = captureFrame();

            const response = await fetch(`${API_URL}/api/process-gesture`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    image: frameData,
                    language: outputLanguage,
                    generate_sentence: true
                })
            });

            const data = await response.json();

            if (data.success) {
                setGeneratedSentence(data.generated_sentence || words.join(' '));
                setTranslatedSentence(data.translated_text || words.join(' '));
                setCurrentGesture('Complete!');

                // Speak the translated text if live voice is enabled
                if (liveVoice && data.translated_text) {
                    speakText(data.translated_text);
                }
            }
        } catch (error) {
            console.error('Error generating sentence:', error);
            setCurrentGesture('Error processing gestures');
        }
    };

    const speakText = (text) => {
        if ('speechSynthesis' in window) {
            const utterance = new SpeechSynthesisUtterance(text);

            // Set language based on selection
            const langMap = {
                'english': 'en-US',
                'hindi': 'hi-IN',
                'marathi': 'mr-IN',
                'gujarati': 'gu-IN'
            };
            utterance.lang = langMap[outputLanguage] || 'en-US';

            window.speechSynthesis.speak(utterance);
        }
    };

    return (
        <div className="sign-to-speech-page">
            <div className="page-header">
                <h1>ISL to Speech Translation</h1>
                <p className="page-subtitle">Convert Indian Sign Language gestures into spoken words with AI enhancement</p>
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
                                    {currentGesture && (
                                        <div style={{
                                            position: 'absolute',
                                            bottom: '10px',
                                            left: '10px',
                                            background: 'rgba(0,0,0,0.7)',
                                            color: 'white',
                                            padding: '8px 12px',
                                            borderRadius: '6px',
                                            fontSize: '14px'
                                        }}>
                                            <strong>{currentGesture}</strong>
                                            {confidence > 0 && (
                                                <span style={{ marginLeft: '8px', opacity: 0.8 }}>
                                                    ({Math.round(confidence * 100)}%)
                                                </span>
                                            )}
                                        </div>
                                    )}
                                </div>
                            )}
                        </div>

                        {/* Hidden canvas for frame capture */}
                        <canvas ref={canvasRef} style={{ display: 'none' }} />

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
                                <option value="hindi">Hindi (हिंदी)</option>
                                <option value="marathi">Marathi (मराठी)</option>
                                <option value="gujarati">Gujarati (ગુજરાતી)</option>
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
                                {detectedWords.length > 0 ? (
                                    <div style={{ width: '100%', textAlign: 'left' }}>
                                        <div style={{ marginBottom: '1rem' }}>
                                            <strong style={{ color: '#6b7280', fontSize: '0.875rem' }}>Detected Words:</strong>
                                            <p style={{ margin: '0.5rem 0', color: '#374151' }}>
                                                {detectedWords.join(', ')}
                                            </p>
                                        </div>

                                        {generatedSentence && (
                                            <div style={{ marginBottom: '1rem' }}>
                                                <strong style={{ color: '#0d9488', fontSize: '0.875rem' }}>
                                                    ✨ AI Generated Sentence:
                                                </strong>
                                                <p style={{ margin: '0.5rem 0', color: '#0f172a', fontSize: '1.125rem', fontWeight: 600 }}>
                                                    {generatedSentence}
                                                </p>
                                            </div>
                                        )}

                                        {translatedSentence && outputLanguage !== 'english' && (
                                            <div style={{
                                                background: '#f0fdfa',
                                                padding: '1rem',
                                                borderRadius: '8px',
                                                border: '2px solid #0d9488'
                                            }}>
                                                <strong style={{ color: '#0d9488', fontSize: '0.875rem' }}>
                                                    🌐 Translated ({outputLanguage}):
                                                </strong>
                                                <p style={{
                                                    margin: '0.5rem 0 0 0',
                                                    color: '#0f172a',
                                                    fontSize: '1.25rem',
                                                    fontWeight: 700,
                                                    lineHeight: 1.6
                                                }}>
                                                    {translatedSentence}
                                                </p>
                                            </div>
                                        )}
                                    </div>
                                ) : (
                                    <>
                                        <p className="output-placeholder">No translation yet</p>
                                        <p className="output-placeholder-sub">Start recognition to see AI-enhanced results</p>
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
