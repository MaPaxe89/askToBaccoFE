import React, { useState, useEffect } from 'react'
import axios from "axios";
import ItemVino from './ItemVino';

import { RiResetLeftFill } from "react-icons/ri";
import { BsSearch } from "react-icons/bs";
import { useNavigate } from 'react-router-dom';
import { IoMdArrowDropright } from "react-icons/io";
import { PiFarmBold } from "react-icons/pi";






const FormHome = ( {setVinoCliccato, setShow: setShowHome}) => {

  const[searchParam, setSearchParam ] = useState("");
  const[suggerimento, setSuggerimento] = useState([])  
  const[listaVini, setListaVini] = useState([])
  const[show, setShow] = useState(false);
  const[attivaButton, setAttivaButton] = useState(false);
  const navigate = useNavigate();
   

 
  const resetParametri =  () => {
    setSearchParam("")    
    setShow(false);
    console.log("parametri di ricerca resettati")
  }

  useEffect(() => {
  console.log("Lista aggiornata:", listaVini);
  }, [listaVini]);

  // setta il valore inserito nell'input collegato al onChange dell'input  
  const handleInputChange = (e) => {    
    const {value} = e.target;
    console.log("sei qui")
    setSearchParam(value);
  } 
  
  const generaSequenza = async () => {

    let viniOrdinati = null;
    if(listaVini.length > 1){
      const ids = listaVini.map((vino)=>vino.idVino);

     const response = await axios.get(
        "http://localhost:8080/api/vino/listaVini",
        {
          params: { vino: ids }
        }
      );
    viniOrdinati = response.data   
    console.log("vini ordinati" +viniOrdinati)  
    }

    navigate("/cardVinoPage", {state: {viniOrdinati}});
  }

  

  

  useEffect(()=>{      
    if(searchParam.length === 0 ){
      setShow(false)
    } 
    if(searchParam.length >= 3){      
        getAutocomplete(searchParam);
    }   
  },[searchParam, suggerimento]);

  //chiamate useEffect non possono essere async per questo si usa un metodo
  const getAutocomplete = async(inputValue)=>{
    console.log("getAutoComplte - FETCH")    
    const response = await axios.get(`http://localhost:8080/api/vino/cercaVino/${inputValue}`);
    //TODO da inserirre i  controlli per errori 
    
    //aggiungo ai suggerimenti la lista dei vini trovata
    if(response.data.length != null){        
        const  duplicati = response.data.filter(vino => listaVini.some(x=> x.idVino === vino.idVino))
        if(duplicati.length > 0){
          const suggerimento = response.data.filter(vino => !duplicati.some(x => x.idVino === vino.idVino) )
          console.log("suggerimo " + JSON.stringify(suggerimento) )
          setSuggerimento(suggerimento);
        } else {
          setSuggerimento(response.data)  
        }
              
        setShow(true)
    }

    console.log("suggerimenti trovati " + suggerimento.length)
  }

  const handleSuggerimentoClick = (vino) => {
    console.log("hai cliccato su " + vino.nome +" "+vino.idVino )
    
    setSearchParam(vino.nome)
    setAttivaButton(true)
    setListaVini((prevLista) => [...prevLista, vino]);
    setSearchParam("")
  }

  const removeItem = (id) => {
  console.log("sta eliminando " + id)
  setListaVini(prev => prev.filter(v => v.idVino !== id));
  };

  return (
  <>

  <div className='p-1   rounded-xl'>
    <h3 className='font-bold'>Cerca il vino desiderato</h3>
  <form className="w-auto flex gap-3 p-3 justify-between">
    
    <div className='flex w-full'> 
      <label className={`text-center  duration-900 ease-in-out text-[25px] font-black items-center flex bold whitespace-nowrap ${ searchParam ? '' : 'animate-bounce'}`}>
        <BsSearch />
      </label>

      <input
        className="w-full capitalize border-0 ml-2 border-b border-stone-0 focus:outline-none focus:ring-0"
        type="text"
        name="name"
        onChange={handleInputChange}
        value={searchParam}
        placeholder='cerca vino'
      />
    </div>

    
      <button className="w-10 rounded btn-xs border-none text-sm  bg-stone-500 hover:bg-stone-500/75 text-center 
             items-center justify-center flex group" onClick={resetParametri}>
        <i className='inline-block transform text-lg transition ease-linear duration-400 
                group-hover:-rotate-360'><RiResetLeftFill /></i>
      </button>
    
  </form>
 
  {show && (
  <div
    className=" text-left  rounded-md w-full z-40 
               opacity-0 scale-95 animate-[fadeIn_0.6s_ease-out_forwards]"
  > 
    <ul className=''>
      {suggerimento.map((vino, index) => (
        <li
          key={vino.idVino || index}
          className="text-stone-0 flex capitalize bg-stone-500 hover:bg-stone-500/75 
                     transition ease-in-out duration-500 items-center  
                     hover:text-white cursor-pointer p-1 h-10"
          onClick={() => handleSuggerimentoClick(vino)}
        >
          <i className='text-xl'><IoMdArrowDropright /></i>
          {vino.nome} - {vino.cantina}
        </li>
      ))}
    </ul>
  </div>
)}

</div>  
  { listaVini.length > 0 && (
  <div className=''>  
    <div className='flex flex-col  space-y-4 mt-2'>
      {
        listaVini.map((vino)=>(
              
          <ItemVino  key={vino.idVino} vino={vino} removeItem={removeItem} setVinoCliccato={setVinoCliccato} setShow={setShowHome}/>
              
        ))
      }
    </div>
    {listaVini.length > 1 && (
      <button className="mt-4 text-sm hover:bg-amber-900  px-4 py-2 bg-amber-950 text-white rounded" onClick={generaSequenza}>
        Genera Sequenza
      </button>
    )}
     
  </div>
  
  )}
  
  </>    
  )
}

export default FormHome;