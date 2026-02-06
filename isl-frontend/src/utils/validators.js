export const isValidImageData = (data) => {
    return data && typeof data === 'string' && data.startsWith('data:image');
};

export const isValidText = (text) => {
    return text && typeof text === 'string' && text.trim().length > 0;
};

export const isBrowserSupported = () => {
    return !!(navigator.mediaDevices && navigator.mediaDevices.getUserMedia);
};

export const isSpeechRecognitionSupported = () => {
    return 'webkitSpeechRecognition' in window || 'SpeechRecognition' in window;
};
