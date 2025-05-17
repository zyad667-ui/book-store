import React from 'react';
import { Link } from 'react-router-dom';
import './Navbar.css';

const Navbar = () => {
    return (
        <nav className="navbar">
            <div className="navbar-brand">
                <Link to="/" className="navbar-logo">
                    Library
                </Link>
            </div>
            <div className="navbar-menu">
                <Link to="/" className="navbar-item">Accueil</Link>
                <Link to="/login" className="navbar-item">Login</Link>
            </div>
        </nav>
    );
};

export default Navbar;