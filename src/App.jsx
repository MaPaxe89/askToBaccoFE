

import './App.css'

import Home from './Pages/Home';
import Navbar from './components/Navbar';
import { Routes, Route } from "react-router-dom";
import CardVinoPage from './Pages/CardVinoPage';
import SingleWinePage from './Pages/SingleWinePage';


function App() {
 

  return (
    <>
    <Navbar />
    <div className="pt-20 ">
    <Routes>
        <Route path="/" element={<Home />} />     
        <Route path="/cardVinoPage" element={<CardVinoPage />} />
        <Route path="/singleWinePage/:idVino" element={<SingleWinePage />} />    
    </Routes>
    </div>
    
    
    </>    
    
  
  )
}

export default App
