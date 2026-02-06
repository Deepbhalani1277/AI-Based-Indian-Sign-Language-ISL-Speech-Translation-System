import { useState, useCallback } from 'react';

const useSpeech = () => {
    const [isListening, setIsListening] = useState(false);
    const [transcript, setTranscript] = useState('');

    const startListening = useCallback(() => {
        // Implement Web Speech API
        if ('webkitSpeechRecognition' in window) {
            const recognition = new webkitSpeechRecognition();
            recognition.continuous = true;
            recognition.interimResults = true;

            recognition.onresult = (event) => {
                const current = event.resultIndex;
                const transcriptText = event.results[current][0].transcript;
                setTranscript(transcriptText);
            };

            recognition.start();
            setIsListening(true);
        }
    }, []);

    const stopListening = useCallback(() => {
        setIsListening(false);
    }, []);

    return { isListening, transcript, startListening, stopListening };
};

export default useSpeech;
