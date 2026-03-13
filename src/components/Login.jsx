import React, { useState } from 'react';
import { login } from './authService';

const Login = () => {
    const [formData, setFormData] = useState({ username: '', password: '' });

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await login(formData.username, formData.password);
            alert("Login successo! Token salvato.");
            // Qui puoi usare useNavigate() di react-router-dom per cambiare pagina
        } catch (err) {
            alert("Errore durante il login: " + err.response?.data || err.message);
        }
    };

    return (
        <div className="login-container">
            <h2>Accedi</h2>
            <form onSubmit={handleSubmit}>
                <input 
                    type="text" 
                    placeholder="Nome Utente" 
                    onChange={(e) => setFormData({...formData, username: e.target.value})} 
                />
                <input 
                    type="password" 
                    placeholder="Password" 
                    onChange={(e) => setFormData({...formData, password: e.target.value})} 
                />
                <button type="submit">Login</button>
            </form>
        </div>
    );
};

export default Login;