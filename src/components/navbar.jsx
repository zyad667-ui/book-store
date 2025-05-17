import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './navbar.css';

const Navbar = () => {
    const [menuOpen, setMenuOpen] = useState(false);
    const navigate = useNavigate();

    // Check if user is logged in
    const currentUser = JSON.parse(localStorage.getItem('currentUser') || 'null');
    const isAdmin = currentUser?.role === 'admin';

    const toggleMenu = () => {
        setMenuOpen(!menuOpen);
    };

    const handleLogout = () => {
        localStorage.removeItem('currentUser');
        navigate('/');
    };

    return (
        <nav className="navbar">
            <div className="navbar-brand">
                <Link to="/" className="navbar-logo">
                    <span className="logo-icon">📚</span>
                    Library
                </Link>
            </div>

            <button className="mobile-menu-btn" onClick={toggleMenu}>
                {menuOpen ? '✕' : '☰'}
            </button>

            <div className={`navbar-menu ${menuOpen ? 'open' : ''}`}>
                <Link to="/" className="navbar-item">Accueil</Link>

                <div className="auth-buttons">
                    {currentUser ? (
                        <>
                            {isAdmin && (
                                <Link to="/admin" className="admin-btn">
                                    Admin
                                </Link>
                            )}
                            <button onClick={handleLogout} className="login-btn">
                                Déconnexion
                            </button>
                        </>
                    ) : (
                        <Link to="/login" className="login-btn">
                            Connexion
                        </Link>
                    )}
                </div>
            </div>
        </nav>
    );
};

export default Navbar;