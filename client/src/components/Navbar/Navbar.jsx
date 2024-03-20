import React from 'react';
import { Link } from 'react-router-dom';
import './Navbar.css';

function Navbar() {
    return (
        <nav className="navbar">
            <h1 className="navbar__title">One Piece Mini Games</h1>
            <div className="navbar__links">
                <Link to="/" className="navbar__link">Home</Link>
                <span className="navbar__separator">|</span>
                <Link to="/jeux" className="navbar__link">Jeux</Link>
                <span className="navbar__separator">|</span>
                <Link to="/wiki" className="navbar__link">Wiki</Link>
            </div>
        </nav>
    );
}

export default Navbar;