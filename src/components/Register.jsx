import React, { useState } from 'react';
import { register } from './authService';

const Register = () => {

    const [formData, setFormData] = useState({ username: '', password: '', email:'' });

    const handleSubmit = async (e) => {
            e.preventDefault();
            try {
                await register(formData.username, formData.password);
                alert("Login successo! Token salvato.");
                // Qui puoi usare useNavigate() di react-router-dom per cambiare pagina
            } catch (err) {
                alert("Errore durante il login: " + err.response?.data || err.message);
            }
        };

    return(
        <div className="register-container">
            <h2>Registrati</h2>
            <form onSubmit={handleSubmit}>
                <input 
                    type="text" 
                    placeholder="Nome Utente" 
                    onChange={(e) => setFormData({...formData, username: e.target.value})} 
                />
                <input 
                    type="email" 
                    placeholder="email" 
                    onChange={(e) => setFormData({...formData, password: e.target.value})} 
                />
                <input 
                    type="date" 
                    placeholder="data nascita" 
                    onChange={(e) => setFormData({...formData, password: e.target.value})} 
                />
                <input 
                    type="password" 
                    placeholder="Password" 
                    onChange={(e) => setFormData({...formData, password: e.target.value})} 
                />
                <button type="submit">Register</button>
            </form>
        </div>

    );


}

export default Register;