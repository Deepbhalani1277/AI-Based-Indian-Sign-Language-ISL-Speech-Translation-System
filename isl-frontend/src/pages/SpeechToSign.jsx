import React from 'react';
import SpeechInput from '../components/speech/SpeechInput';
import GestureViewer from '../components/isl/GestureViewer';
import useSpeech from '../hooks/useSpeech';

const SpeechToSign = () => {
    const { isListening, startListening, stopListening } = useSpeech();

    return (
        <div className="speech-to-sign-page">
            <h1>Speech to Sign</h1>
            <SpeechInput
                isListening={isListening}
                onStart={startListening}
                onStop={stopListening}
            />
            <GestureViewer gestureData={null} />
        </div>
    );
};

export default SpeechToSign;
