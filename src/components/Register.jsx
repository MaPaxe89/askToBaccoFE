import React, { useState } from 'react';
import { register } from './authService';
import { useNavigate } from 'react-router-dom';

const Register = () => {

    const [formData, setFormData] = useState({ username: '', password: '', email:'' });
    const navigate = useNavigate();
    const handleSubmit = async (e) => {
            e.preventDefault();
            try {
                await register(formData.username, formData.password, formData.email);
                navigate("/login");
                // Qui puoi usare useNavigate() di react-router-dom per cambiare pagina
            } catch (err) {
                alert("Errore durante il login: " + err.response?.data || err.message);
            }
        };

    return(

        
        <div className="login-container p-2 justify-center align-middle justify-items-center">
            <h2 className="text-2xl font-bold mb-4">Registrati</h2>
            <form onSubmit={handleSubmit} className='flex flex-col shadow-lg gap-6 w-150'>
                <div className='flex flex-col'>
                    <label className='text-left'>Nome:</label>
                    <input 
                        className='w-full capitalize border-0 ml-2 border-b border-stone-0 focus:outline-none focus:ring-0'
                        type="text" 
                        placeholder="Nome Utente" 
                        onChange={(e) => setFormData({...formData, username: e.target.value})} 
                    />
                </div>

                <div className='flex flex-col'>
                    <label className='text-left'>Email</label>
                    <input
                        className='w-full capitalize border-0 ml-2 border-b border-stone-0 focus:outline-none focus:ring-0' 
                        type="email" 
                        placeholder="email" 
                        onChange={(e) => setFormData({...formData, email: e.target.value})} 
                    />
                </div>

               <div className='flex flex-col'>
                    <label className='text-left'>Password</label>
                    <input 
                        className='w-full capitalize border-0 ml-2 border-b border-stone-0 focus:outline-none focus:ring-0'
                        type="password" 
                        placeholder="Password" 
                        onChange={(e) => setFormData({...formData, password: e.target.value})} 
                    />                
               </div>
                <button 
                    className="bg-red-700 text-white py-2 rounded hover:bg-red-800 transition"
                    type="submit"
                >
                    Registrati
                </button>
            </form>
        </div>

    );


}

export default Register;