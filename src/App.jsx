

import './App.css'

import Home from './Pages/Home';
import Navbar from './components/Navbar';
import { Routes, Route } from "react-router-dom";
import CardVinoPage from './Pages/CardVinoPage';
import SingleWinePage from './Pages/SingleWinePage';
import Login from './components/Login';
import Register from './components/Register';


function App() {
 

  return (
    <>
    <Navbar />
    <div className="pt-20 ">
    <Routes>
        <Route path="/" element={<Home />} />     
        <Route path="/cardVinoPage" element={<CardVinoPage />} />
        <Route path="/singleWinePage/:idVino" element={<SingleWinePage />} />
        <Route path="Login" element={<Login />} /> 
        <Route path="Register" element={<Register />} />   
    </Routes>
    </div>
    
    
    </>    
    
  
  )
}

export default App
