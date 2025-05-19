import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Login.css';

const Login = () => {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        email: '',
        password: '',
    });
    const [verificationCode, setVerificationCode] = useState('');
    const [showVerification, setShowVerification] = useState(false);
    const [generatedCode, setGeneratedCode] = useState('');

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const code = Math.floor(1000 + Math.random() * 9000).toString();
        setGeneratedCode(code);

        alert(`Votre code de vérification est : ${code}`);
        setShowVerification(true);
    };

    const handleVerification = (e) => {
        e.preventDefault();
        if (verificationCode === generatedCode) {
            
            const userId = Date.now().toString();
            const newUser = {
                id: userId,
                ...formData,
                role: 'user'
            };

        
            const users = JSON.parse(localStorage.getItem('users') || '[]');
            users.push(newUser);
            localStorage.setItem('users', JSON.stringify(users));

            localStorage.setItem('currentUser', JSON.stringify(newUser));

            alert('Compte créé avec succès !');
            navigate('/');
        } else {
            alert('Code de vérification incorrect');
        }
    };

    return (
        <div className="login-container">
            {!showVerification ? (
                <form onSubmit={handleSubmit} className="login-form">
                    <h2>Créer un compte</h2>
                    <div className="form-group">
                        <input
                            type="text"
                            name="firstName"
                            placeholder="Prénom"
                            value={formData.firstName}
                            onChange={handleInputChange}
                            required
                        />
                    </div>
                    <div className="form-group">
                        <input
                            type="text"
                            name="lastName"
                            placeholder="Nom"
                            value={formData.lastName}
                            onChange={handleInputChange}
                            required
                        />
                    </div>
                    <div className="form-group">
                        <input
                            type="email"
                            name="email"
                            placeholder="Email"
                            value={formData.email}
                            onChange={handleInputChange}
                            required
                        />
                    </div>
                    <div className="form-group">
                        <input
                            type="password"
                            name="password"
                            placeholder="Mot de passe"
                            value={formData.password}
                            onChange={handleInputChange}
                            required
                        />
                    </div>
                    <button type="submit" className="submit-btn">Vérifier</button>
                </form>
            ) : (
                <form onSubmit={handleVerification} className="verification-form">
                    <h2>Vérification</h2>
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
            )}
        </div>
    );
};

export default Login;