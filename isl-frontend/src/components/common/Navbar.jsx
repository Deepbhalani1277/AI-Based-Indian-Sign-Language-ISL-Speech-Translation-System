import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import './Navbar.css';

const Navbar = () => {
    const { isAuthenticated, user, logout } = useAuth();
    const [showDropdown, setShowDropdown] = useState(false);
    const navigate = useNavigate();

    const handleLogout = () => {
        logout();
        setShowDropdown(false);
        navigate('/');
    };

    return (
        <nav className="navbar">
            <div className="navbar-container">
                <div className="nav-brand">
                    <Link to={isAuthenticated ? "/dashboard" : "/"} className="brand-link">
                        <div className="brand-icon">
                            <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M7 13C7 11.8954 7.89543 11 9 11C10.1046 11 11 11.8954 11 13V17C11 18.1046 10.1046 19 9 19C7.89543 19 7 18.1046 7 17V13Z" fill="currentColor" />
                                <path d="M13 9C13 7.89543 13.8954 7 15 7C16.1046 7 17 7.89543 17 9V17C17 18.1046 16.1046 19 15 19C13.8954 19 13 18.1046 13 17V9Z" fill="currentColor" />
                                <path d="M9 7C9 5.89543 9.89543 5 11 5C12.1046 5 13 5.89543 13 7V13C13 14.1046 12.1046 15 11 15C9.89543 15 9 14.1046 9 13V7Z" fill="currentColor" />
                            </svg>
                        </div>
                        <span className="brand-text">ISL Translator</span>
                    </Link>
                </div>

                <ul className="nav-links">
                    {!isAuthenticated ? (
                        <>
                            <li><Link to="/" className="nav-link">Home</Link></li>
                            <li><Link to="/feedback" className="nav-link">Feedback</Link></li>
                            <li><Link to="/login" className="nav-link-btn">Login</Link></li>
                        </>
                    ) : (
                        <>
                            <li><Link to="/" className="nav-link">Home</Link></li>
                            <li><Link to="/sign-to-speech" className="nav-link">ISL to Speech</Link></li>
                            <li><Link to="/speech-to-sign" className="nav-link">Speech to ISL</Link></li>
                            <li><Link to="/feedback" className="nav-link">Feedback</Link></li>
                            <li className="user-profile">
                                <button
                                    className="profile-button"
                                    onClick={() => setShowDropdown(!showDropdown)}
                                >
                                    <div className="user-avatar">
                                        {user?.name?.charAt(0).toUpperCase() || 'U'}
                                    </div>
                                    <span className="user-name">{user?.name || 'User'}</span>
                                    <svg className="dropdown-icon" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                                    </svg>
                                </button>
                                {showDropdown && (
                                    <div className="dropdown-menu">
                                        <button onClick={handleLogout} className="dropdown-item">
                                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                                            </svg>
                                            Logout
                                        </button>
                                    </div>
                                )}
                            </li>
                        </>
                    )}
                </ul>
            </div>
        </nav>
    );
};

export default Navbar;
