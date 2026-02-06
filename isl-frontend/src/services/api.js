const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';

export const api = {
    async processGesture(imageData) {
        const response = await fetch(`${API_BASE_URL}/api/process-gesture`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ image: imageData })
        });
        return response.json();
    },

    async convertSpeechToSign(text) {
        const response = await fetch(`${API_BASE_URL}/api/speech-to-sign`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ text })
        });
        return response.json();
    }
};

export default api;
