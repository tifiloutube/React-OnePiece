import React from 'react';
import { Link } from 'react-router-dom';
import './Navbar.css';
import luffyHat from '../../Image/luffyhat-removebg-preview.png';

function Navbar() {
    return (
        <nav className="navbar">
            <img src={luffyHat} alt="Luffy Hat" />
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
