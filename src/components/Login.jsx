import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Login.css';

const Login = () => {
    const navigate = useNavigate();
    // Mode: 'register' pour créer un compte, 'login' pour se connecter
    const [mode, setMode] = useState('login');

    // Données du formulaire d'inscription
    const [registerData, setRegisterData] = useState({
        firstName: '',
        lastName: '',
        email: '',
        password: '',
    });

    // Données du formulaire de connexion
    const [loginData, setLoginData] = useState({
        email: '',
        password: '',
    });

    const [verificationCode, setVerificationCode] = useState('');
    const [showVerification, setShowVerification] = useState(false);
    const [generatedCode, setGeneratedCode] = useState('');
    const [error, setError] = useState('');

    // Pour le formulaire d'inscription
    const handleRegisterChange = (e) => {
        const { name, value } = e.target;
        setRegisterData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    // Pour le formulaire de connexion
    const handleLoginChange = (e) => {
        const { name, value } = e.target;
        setLoginData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    // Soumission du formulaire d'inscription
    const handleRegisterSubmit = (e) => {
        e.preventDefault();
        const code = Math.floor(1000 + Math.random() * 9000).toString();
        setGeneratedCode(code);

        alert(`Votre code de vérification est : ${code}`);
        setShowVerification(true);
    };

    // Vérification du code pour l'inscription
    const handleVerification = (e) => {
        e.preventDefault();
        if (verificationCode === generatedCode) {

            const userId = Date.now().toString();
            const newUser = {
                id: userId,
                ...registerData,
                role: 'user'
            };

            const users = JSON.parse(localStorage.getItem('users') || '[]');
            users.push(newUser);
            localStorage.setItem('users', JSON.stringify(users));

            localStorage.setItem('currentUser', JSON.stringify(newUser));

            alert('Compte créé avec succès !');
            navigate('/');
        } else {
            setError('Code de vérification incorrect');
        }
    };

    // Soumission du formulaire de connexion
    const handleLoginSubmit = (e) => {
        e.preventDefault();

        const users = JSON.parse(localStorage.getItem('users') || '[]');
        const user = users.find(u =>
            u.email === loginData.email &&
            u.password === loginData.password
        );

        if (user) {
            localStorage.setItem('currentUser', JSON.stringify(user));
            navigate('/');
        } else {
            setError('Email ou mot de passe incorrect');
        }
    };

    // Basculer entre les modes connexion et inscription
    const toggleMode = () => {
        setMode(mode === 'login' ? 'register' : 'login');
        setError('');
    };

    return (
        <div className="login-container">
            {showVerification ? (
                // Formulaire de vérification pour l'inscription
                <form onSubmit={handleVerification} className="verification-form">
                    <h2>Vérification</h2>
                    {error && (
                        <div style={{ color: 'red', marginBottom: '1rem', textAlign: 'center' }}>
                            {error}
                        </div>
                    )}
                    <div className="form-group">
                        <input
                            type="text"
                            placeholder="Code à 4 chiffres"
                            value={verificationCode}
                            onChange={(e) => setVerificationCode(e.target.value)}
                            maxLength="4"
                            required
                        />
                    </div>
                    <button type="submit" className="submit-btn">Valider</button>
                </form>
            ) : mode === 'login' ? (
                // Formulaire de connexion
                <form onSubmit={handleLoginSubmit} className="login-form">
                    <h2>Connexion</h2>
                    {error && (
                        <div style={{ color: 'red', marginBottom: '1rem', textAlign: 'center' }}>
                            {error}
                        </div>
                    )}
                    <div className="form-group">
                        <input
                            type="email"
                            name="email"
                            placeholder="Email"
                            value={loginData.email}
                            onChange={handleLoginChange}
                            required
                        />
                    </div>
                    <div className="form-group">
                        <input
                            type="password"
                            name="password"
                            placeholder="Mot de passe"
                            value={loginData.password}
                            onChange={handleLoginChange}
                            required
                        />
                    </div>
                    <button type="submit" className="submit-btn">Se connecter</button>
                    <div style={{ marginTop: '1rem', textAlign: 'center' }}>
                        <p>Pas encore de compte ? <button
                            type="button"
                            onClick={toggleMode}
                            style={{ background: 'none', border: 'none', color: '#3498db', cursor: 'pointer' }}
                        >
                            S'inscrire
                        </button></p>
                    </div>
                </form>
            ) : (
                // Formulaire d'inscription
                <form onSubmit={handleRegisterSubmit} className="login-form">
                    <h2>Créer un compte</h2>
                    {error && (
                        <div style={{ color: 'red', marginBottom: '1rem', textAlign: 'center' }}>
                            {error}
                        </div>
                    )}
                    <div className="form-group">
                        <input
                            type="text"
                            name="firstName"
                            placeholder="Prénom"
                            value={registerData.firstName}
                            onChange={handleRegisterChange}
                            required
                        />
                    </div>
                    <div className="form-group">
                        <input
                            type="text"
                            name="lastName"
                            placeholder="Nom"
                            value={registerData.lastName}
                            onChange={handleRegisterChange}
                            required
                        />
                    </div>
                    <div className="form-group">
                        <input
                            type="email"
                            name="email"
                            placeholder="Email"
                            value={registerData.email}
                            onChange={handleRegisterChange}
                            required
                        />
                    </div>
                    <div className="form-group">
                        <input
                            type="password"
                            name="password"
                            placeholder="Mot de passe"
                            value={registerData.password}
                            onChange={handleRegisterChange}
                            required
                        />
                    </div>
                    <button type="submit" className="submit-btn">S'inscrire</button>
                    <div style={{ marginTop: '1rem', textAlign: 'center' }}>
                        <p>Déjà un compte ? <button
                            type="button"
                            onClick={toggleMode}
                            style={{ background: 'none', border: 'none', color: '#3498db', cursor: 'pointer' }}
                        >
                            Se connecter
                        </button></p>
                    </div>
                </form>
            )}
        </div>
    );
};

export default Login;