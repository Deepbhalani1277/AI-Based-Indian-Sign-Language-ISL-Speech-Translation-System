import React from 'react';
import Button from '../common/Button';

const CameraControls = ({ isActive, onStart, onStop }) => {
    return (
        <div className="camera-controls">
            {!isActive ? (
                <Button onClick={onStart} variant="primary">Start Camera</Button>
            ) : (
                <Button onClick={onStop} variant="danger">Stop Camera</Button>
            )}
        </div>
    );
};

export default CameraControls;
