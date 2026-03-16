import React, { useState, useContext } from 'react'; // 1. Aggiungi useContext
import { login as loginService } from './authService'; // Rinominiamo per non fare confusione
import { useNavigate } from 'react-router-dom';
import { AuthContext } from './AuthContext'; // 2. Importa il Context

const Login = () => {
    const [formData, setFormData] = useState({ username: '', password: '' });
    const navigate = useNavigate();
    
    // 3. Estrai la funzione login dal Context
    const { login } = useContext(AuthContext);

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            // Chiamata al servizio API (authService)
            const response = await loginService(formData.username, formData.password);
            
            // 4. Se l'API restituisce i dati dell'utente, passali al Context
            // Nota: adatta 'response' in base a come il tuo backend restituisce i dati
            const userData = { username: formData.username, ...response }; 
            
            login(userData); // Questa funzione aggiorna lo stato globale e la Navbar!
            navigate("/"); 
        } catch (err) {
            alert("Errore durante il login: " + (err.response?.data || err.message));
        }
    };

    return (
        <div className="login-container p-2 justify-center align-middle justify-items-center">
            <h2 className="text-2xl font-bold mb-4">Accedi</h2>
            <form onSubmit={handleSubmit} className="flex flex-col gap-4 w-80">
                <input 
                    className="border p-2 rounded text-black"
                    type="text" 
                    placeholder="Nome Utente" 
                    onChange={(e) => setFormData({...formData, username: e.target.value})} 
                />
                <input 
                    className="border p-2 rounded text-black"
                    type="password" 
                    placeholder="Password" 
                    onChange={(e) => setFormData({...formData, password: e.target.value})} 
                />
                <button 
                    className="bg-red-700 text-white py-2 rounded hover:bg-red-800 transition"
                    type="submit"
                >
                    Login
                </button>
            </form>
        </div>
    );
};

export default Login;