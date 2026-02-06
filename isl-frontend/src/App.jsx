import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import { TranslationProvider } from './context/TranslationContext';
import Navbar from './components/common/Navbar';
import Footer from './components/common/Footer';
import ProtectedRoute from './components/auth/ProtectedRoute';
import Home from './pages/Home';
import Login from './pages/Login';
import Signup from './pages/Signup';
import Dashboard from './pages/Dashboard';
import SignToSpeech from './pages/SignToSpeech';
import SpeechToSign from './pages/SpeechToSign';
import Feedback from './pages/Feedback';
import About from './pages/About';
import './index.css';

function App() {
    return (
        <AuthProvider>
            <TranslationProvider>
                <Router>
                    <div className="app">
                        <Navbar />
                        <main className="main-content">
                            <Routes>
                                {/* Public Routes */}
                                <Route path="/" element={<Home />} />
                                <Route path="/login" element={<Login />} />
                                <Route path="/signup" element={<Signup />} />
                                <Route path="/feedback" element={<Feedback />} />
                                <Route path="/about" element={<About />} />

                                {/* Protected Routes */}
                                <Route
                                    path="/dashboard"
                                    element={
                                        <ProtectedRoute>
                                            <Dashboard />
                                        </ProtectedRoute>
                                    }
                                />
                                <Route
                                    path="/sign-to-speech"
                                    element={
                                        <ProtectedRoute>
                                            <SignToSpeech />
                                        </ProtectedRoute>
                                    }
                                />
                                <Route
                                    path="/speech-to-sign"
                                    element={
                                        <ProtectedRoute>
                                            <SpeechToSign />
                                        </ProtectedRoute>
                                    }
                                />
                            </Routes>
                        </main>
                        <Footer />
                    </div>
                </Router>
            </TranslationProvider>
        </AuthProvider>
    );
}

export default App;
