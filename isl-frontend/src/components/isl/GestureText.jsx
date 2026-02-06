import React from 'react';

const GestureText = ({ text }) => {
    return (
        <div className="gesture-text">
            <h3>Recognized Text:</h3>
            <p>{text || 'No text recognized yet'}</p>
        </div>
    );
};

export default GestureText;
