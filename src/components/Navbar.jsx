import { Link, useNavigate } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "./AuthContext";

const Navbar = () =>{

    const { user, logout } = useContext(AuthContext);
    const navigate = useNavigate();

    const handleLogout = () => {
        logout();
        navigate("/");
    };

    return (
    
    <>
        
        
<nav className="flex items-center justify-between top-0 z-50 mt-5 px-5 py-2 rounded-3xl shadow-lg bg-[#3d2e379f] text-white w-[90vw] left-1/2 transform -translate-x-1/2 relative h-20">
    
    <div className="flex items-center z-10">
        <Link to={`/`}>
        <img src=".\images\logo-asktobacco.png" alt="logo bacco" className="h-10" />
        </Link>
    </div>

    <div className="absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 h-full flex items-center">
        <ul className="flex  h-full">
            <li className="h-full flex items-center">
                <Link to={`/`} className="px-5 h-full flex items-center hover:bg-stone-500 transition duration-200">Home</Link>
            </li>
            <li className="h-full flex items-center">
                <Link to={`/cardVinoPage`} className="px-5 h-full flex items-center hover:bg-stone-500 transition duration-200 ">Card Vino Page</Link>
            </li>
            <li className="h-full flex items-center">
                <Link to={`/cardVinoPage/:idVino`} className="px-5 h-full flex items-center hover:bg-stone-500 transition duration-200 ">Single Wine</Link>
            </li>
        </ul>
    </div>
    
    <div className="z-10 flex items-center gap-4"> 
                {/* RENDERING CONDIZIONALE */}
                {user ? (
                    <div className="flex items-center gap-4">
                        <div 
                            className="w-10 h-10 rounded-full bg-red-700 flex items-center justify-center text-white font-bold border-2 border-white uppercase"
                            title={user.username}
                        >
                            {/* Mostra l'iniziale dell'utente (o del nome se presente) */}
                            {user.username ? user.username.charAt(0) : "U"}
                        </div>
                        <button 
                            onClick={handleLogout}
                            className="hover:text-red-400 transition duration-200 text-sm"
                        >
                            Logout
                        </button>
                    </div>
                ) : (
                    <>
                        <Link to={`/login`} className="hover:text-gray-300 transition duration-200">
                            Login
                        </Link>
                        <Link to={`/register`} className="bg-red-700 hover:bg-red-800 text-white py-2 px-4 rounded-lg shadow-md transition duration-200">
                            Registrati
                        </Link>
                    </>
                )}
            </div>
</nav>






        </>
    )
}

export default Navbar;