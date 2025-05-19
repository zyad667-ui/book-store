import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Login.css'; 

const LoginAdmin = () => {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        email: '',
        password: '',
    });
    const [error, setError] = useState('');

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        
        const users = JSON.parse(localStorage.getItem('users') || '[]');
        const admin = users.find(user =>
            user.email === formData.email &&
            user.password === formData.password &&
            user.role === 'admin'
        );

        if (admin) {

            localStorage.setItem('currentUser', JSON.stringify(admin));
            navigate('/admin');
        } else {
            setError('Email ou mot de passe incorrect');
        }
    };

    return (
        <div className="login-container">
            <form onSubmit={handleSubmit} className="login-form">
                <h2>Connexion Admin</h2>
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
                <button type="submit" className="submit-btn">Connexion</button>
                <div style={{ marginTop: '1rem', textAlign: 'center', fontSize: '0.9rem' }}>
                    <p>Admin par défaut:</p>
                    <p>Email: admin@library.com</p>
                    <p>Mot de passe: admin123</p>
                </div>
            </form>
        </div>
    );
};

export default LoginAdmin;