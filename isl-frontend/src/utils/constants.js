export const API_ENDPOINTS = {
    PROCESS_GESTURE: '/api/process-gesture',
    SPEECH_TO_SIGN: '/api/speech-to-sign',
    SIGN_TO_SPEECH: '/api/sign-to-speech'
};

export const SOCKET_EVENTS = {
    GESTURE_DETECTED: 'gesture_detected',
    SPEECH_RECOGNIZED: 'speech_recognized',
    ERROR: 'error'
};

export const CAMERA_CONFIG = {
    width: 1280,
    height: 720,
    facingMode: 'user'
};

export const SPEECH_CONFIG = {
    language: 'en-IN',
    continuous: true,
    interimResults: true
};
