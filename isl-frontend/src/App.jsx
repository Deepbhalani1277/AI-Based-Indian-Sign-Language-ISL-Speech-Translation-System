import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/common/Navbar';
import Home from './pages/Home';
import SignToSpeech from './pages/SignToSpeech';
import SpeechToSign from './pages/SpeechToSign';
import About from './pages/About';
import './index.css';

function App() {
    return (
        <Router>
            <div className="app">
                <Navbar />
                <main className="main-content">
                    <Routes>
                        <Route path="/" element={<Home />} />
                        <Route path="/sign-to-speech" element={<SignToSpeech />} />
                        <Route path="/speech-to-sign" element={<SpeechToSign />} />
                        <Route path="/about" element={<About />} />
                    </Routes>
                </main>
            </div>
        </Router>
    );
}

export default App;
