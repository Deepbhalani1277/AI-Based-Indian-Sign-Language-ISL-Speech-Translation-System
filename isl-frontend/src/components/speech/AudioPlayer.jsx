import React, { useRef, useEffect } from 'react';

const AudioPlayer = ({ audioSrc }) => {
    const audioRef = useRef(null);

    useEffect(() => {
        if (audioRef.current && audioSrc) {
            audioRef.current.play();
        }
    }, [audioSrc]);

    return (
        <div className="audio-player">
            <audio ref={audioRef} src={audioSrc} controls />
        </div>
    );
};

export default AudioPlayer;
