import React, { useRef, useEffect } from 'react';

const CameraFeed = ({ stream }) => {
    const videoRef = useRef(null);

    useEffect(() => {
        if (videoRef.current && stream) {
            videoRef.current.srcObject = stream;
        }
    }, [stream]);

    return (
        <div className="camera-feed">
            <video ref={videoRef} autoPlay playsInline />
        </div>
    );
};

export default CameraFeed;
