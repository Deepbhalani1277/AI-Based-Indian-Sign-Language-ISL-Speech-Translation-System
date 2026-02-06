import React from 'react';

const GestureViewer = ({ gestureData }) => {
    return (
        <div className="gesture-viewer">
            {gestureData ? (
                <div className="gesture-display">
                    <img src={gestureData.image} alt="ISL Gesture" />
                </div>
            ) : (
                <p>No gesture to display</p>
            )}
        </div>
    );
};

export default GestureViewer;
