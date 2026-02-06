import React from 'react';
import { Link } from 'react-router-dom';

const Home = () => {
    return (
        <div className="home-page">
            <h1>ISL Translation System</h1>
            <p>Welcome to the Indian Sign Language Translation System</p>
            <div className="feature-cards">
                <Link to="/sign-to-speech" className="feature-card">
                    <h2>Sign to Speech</h2>
                    <p>Convert ISL gestures to speech</p>
                </Link>
                <Link to="/speech-to-sign" className="feature-card">
                    <h2>Speech to Sign</h2>
                    <p>Convert speech to ISL gestures</p>
                </Link>
            </div>
        </div>
    );
};

export default Home;
