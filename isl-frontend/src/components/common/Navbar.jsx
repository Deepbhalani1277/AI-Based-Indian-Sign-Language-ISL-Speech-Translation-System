import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
    return (
        <nav className="navbar">
            <div className="nav-brand">
                <Link to="/">ISL Translator</Link>
            </div>
            <ul className="nav-links">
                <li><Link to="/">Home</Link></li>
                <li><Link to="/sign-to-speech">Sign to Speech</Link></li>
                <li><Link to="/speech-to-sign">Speech to Sign</Link></li>
                <li><Link to="/about">About</Link></li>
            </ul>
        </nav>
    );
};

export default Navbar;
