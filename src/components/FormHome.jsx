import React, { useState, useEffect, useContext } from 'react';
import axios from "./axiosConfig";
import ItemVino from './ItemVino';

import { RiResetLeftFill } from "react-icons/ri";
import { BsSearch } from "react-icons/bs";
import { useNavigate } from 'react-router-dom';
import { IoMdArrowDropright } from "react-icons/io";
import { AuthContext } from "./AuthContext";

const FormHome = ({ setVinoCliccato, setShow: setShowHome }) => {
  const { user } = useContext(AuthContext);

  const [searchParam, setSearchParam] = useState("");
  const [suggerimento, setSuggerimento] = useState([]);
  const [listaVini, setListaVini] = useState([]);
  const [show, setShow] = useState(false);
  const navigate = useNavigate();

  // LOGICA LIMITI:
  const maxVini = user ? 5 : 3;
  const isLimitReached = listaVini.length >= maxVini;

  const resetParametri = (e) => {
    e.preventDefault(); // Impedisce il refresh del form
    setSearchParam("");
    setShow(false);
    setSuggerimento([]);
    setListaVini([])
    console.log("Parametri di ricerca resettati");
  };

  const handleInputChange = (e) => {
    setSearchParam(e.target.value);
  };

  const getAutocomplete = async (inputValue) => {
    if (isLimitReached) return;

    console.log("getAutocomplete - FETCH");
    
    // Configurazione dinamica degli headers: se c'è il token lo mettiamo, altrimenti no
    const config = {};
    if (user?.token) {
      config.headers = { 'Authorization': `Bearer ${user.token}` };
    }

    try {
      const response = await axios.get(
        `http://localhost:8080/api/vino/cercaVino/${inputValue}`, 
        config
      );

      if (response.data) {
        // Filtriamo i vini già presenti in listaVini
        const nuoviSuggerimenti = response.data.filter(
          vino => !listaVini.some(x => x.idVino === vino.idVino)
        );
        setSuggerimento(nuoviSuggerimenti);
        setShow(nuoviSuggerimenti.length > 0);
      }
    } catch (error) {
      console.error("Errore nella fetch:", error);
    }
  };

  // Gestione ricerca: scatta solo se searchParam cambia e ha almeno 3 caratteri
  useEffect(() => {
    if (searchParam.length >= 3 && !isLimitReached) {
      getAutocomplete(searchParam);
    } else {
      setShow(false);
    }
  }, [searchParam]); 

  const handleSuggerimentoClick = (vino) => {
    if (isLimitReached) return;
    
    setListaVini((prevLista) => [...prevLista, vino]);
    setSearchParam("");
    setShow(false);
    setSuggerimento([]);
  };

  const removeItem = (id) => {
    setListaVini(prev => prev.filter(v => v.idVino !== id));
  };

  const generaSequenza = async () => {
    let viniOrdinati = null;
    if (listaVini.length > 1) {
      const ids = listaVini.map((vino) => vino.idVino);
      try {
        const response = await axios.get("http://localhost:8080/api/vino/listaVini", {
          params: { vino: ids }
        });
        viniOrdinati = response.data;
      } catch (error) {
        console.error("Errore generazione sequenza:", error);
      }
    }
    navigate("/cardVinoPage", { state: { viniOrdinati } });
  };

  return (
    <>
      <div className='p-1 rounded-xl'>
        <h3 className='font-bold'>Cerca il vino desiderato</h3>
        
        <form className="w-auto flex gap-3 p-3 justify-between" onSubmit={(e) => e.preventDefault()}>
          <div className='flex w-full items-center'>
            <label className={`text-[25px] font-black flex items-center transition-all duration-500 ${!isLimitReached && !searchParam ? 'animate-bounce' : ''}`}>
              <BsSearch />
            </label>
            
            <input
              className="w-full capitalize border-0 ml-2 border-b border-stone-300 focus:outline-none focus:ring-0 disabled:opacity-50"
              type="text"
              onChange={handleInputChange}
              value={searchParam}
              placeholder={isLimitReached ? "Limite raggiunto" : "Nome del vino..."}
              disabled={isLimitReached}
            />
          </div>

          <button 
            type="button"
            title="Resetta la ricerca" 
            className="w-10 h-10 rounded bg-stone-500 hover:bg-stone-600 text-white flex items-center justify-center group transition-colors"
            onClick={resetParametri}
          >
            <RiResetLeftFill className="text-lg group-hover:rotate-[-360deg] transition-transform duration-500" />
          </button>
        </form>

        {/* Messaggio Limite */}
        {isLimitReached && (
          <div className="px-3 flex text-center align-middle justify-center flex-column">
            <p className="text-center text-red-600 font-bold text-sm animate-pulse">
              LIMITE RAGGIUNTO {user ? <p>Hai già inserito i tuoi 5 vini</p> : <p> Registrati o Login per inserire più di 3 vini</p>}
            </p>
          </div>
        )}

        {/* Suggerimenti Dropdown */}
        {show && (
          <div className="text-left rounded-md w-full z-40 bg-white shadow-lg overflow-hidden animate-[fadeIn_0.3s_ease-out]">
            <ul>
              {suggerimento.map((vino) => (
                <li
                  key={vino.idVino}
                  className="text-stone-100 flex capitalize bg-stone-500 hover:bg-stone-700 transition-colors items-center cursor-pointer p-2 h-10 border-b border-stone-400"
                  onClick={() => handleSuggerimentoClick(vino)}
                >
                  <IoMdArrowDropright className='text-xl' />
                  <span className="ml-1">{vino.nome} - {vino.cantina}</span>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>

      {/* Lista Vini Selezionati */}
      {listaVini.length > 0 && (
        <div className='mt-4'>
          <div className='flex flex-col space-y-4'>
            {listaVini.map((vino) => (
              <ItemVino 
                key={vino.idVino} 
                vino={vino} 
                removeItem={removeItem} 
                setVinoCliccato={setVinoCliccato} 
                setShow={setShowHome} 
              />
            ))}
          </div>
          
          {listaVini.length > 1 && (
            <button 
              className="mt-6 text-sm hover:bg-amber-900 px-6 py-2 bg-amber-950 text-white rounded-full transition-all"
              onClick={generaSequenza}
            >
              Genera Sequenza
            </button>
          )}
        </div>
      )}
    </>
  );
};

export default FormHome;