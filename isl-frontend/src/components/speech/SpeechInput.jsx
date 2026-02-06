import React from 'react';
import Button from '../common/Button';

const SpeechInput = ({ isListening, onStart, onStop }) => {
    return (
        <div className="speech-input">
            {!isListening ? (
                <Button onClick={onStart} variant="primary">Start Listening</Button>
            ) : (
                <Button onClick={onStop} variant="danger">Stop Listening</Button>
            )}
        </div>
    );
};

export default SpeechInput;
