import { useState, useCallback } from 'react';
import mediaService from '../services/mediaService';

const useCamera = () => {
    const [stream, setStream] = useState(null);
    const [isActive, setIsActive] = useState(false);

    const startCamera = useCallback(async () => {
        try {
            const cameraStream = await mediaService.getCameraStream();
            setStream(cameraStream);
            setIsActive(true);
        } catch (error) {
            console.error('Failed to start camera:', error);
        }
    }, []);

    const stopCamera = useCallback(() => {
        if (stream) {
            mediaService.stopStream(stream);
            setStream(null);
            setIsActive(false);
        }
    }, [stream]);

    return { stream, isActive, startCamera, stopCamera };
};

export default useCamera;
