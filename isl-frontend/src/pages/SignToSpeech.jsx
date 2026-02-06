import React from 'react';
import CameraFeed from '../components/camera/CameraFeed';
import CameraControls from '../components/camera/CameraControls';
import GestureText from '../components/isl/GestureText';
import useCamera from '../hooks/useCamera';

const SignToSpeech = () => {
    const { stream, isActive, startCamera, stopCamera } = useCamera();

    return (
        <div className="sign-to-speech-page">
            <h1>Sign to Speech</h1>
            <CameraFeed stream={stream} />
            <CameraControls
                isActive={isActive}
                onStart={startCamera}
                onStop={stopCamera}
            />
            <GestureText text="" />
        </div>
    );
};

export default SignToSpeech;
