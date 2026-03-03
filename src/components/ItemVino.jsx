
import { CiSquareRemove } from "react-icons/ci";

import { PiFarmBold } from "react-icons/pi";

import { FaBookOpen } from "react-icons/fa";
import { IoRemove } from "react-icons/io5";








const ItemVino = ({vino, removeItem, setVinoCliccato, setShow}) => {
   
  const handleSetVinoCliccato =(vino) =>{
    console.log("hai cliccato sul vino " + JSON.stringify(vino.nome))
      setVinoCliccato(vino);
      setShow(prev => !prev)
      
  }
  
  let lunghezzaTesta = ( testo )=>{
    if(testo.length > 120 ){
      let testoAbbreviato = testo.slice(0, 80) + "...";
      return testoAbbreviato;
    }
    return testo;
  }

 
  return (
    <>
    
    <div className='text-left w-auto bg-[#3d2e379f]  rounded-xl shadow-md flex items-center'>

  <div className="flex items-center p-2">
    <div className='w-20'>
      <img src={`/images/${vino.path}`} className='object-cover h-auto drop-shadow-xl/25'/>
    </div>

    <div className='ml-3 '>
      <p className='titleItem items-center capitalize  '>{vino.nome}</p>
      <p className='flex gap-1 items-center text-[14px] capitalize text-zinc-400capitalize'>
        {vino.cantina}
      </p>     
      <hr className="mt-3 text-zinc-400 "></hr>
      <button onClick={() => handleSetVinoCliccato(vino)} 
        className="flex mt-3  border-zinc-400 rounded-3xl items-center text-zinc-400 hover:text-zinc-100 gap-2 cursor-pointer text-[13px]">
        <FaBookOpen />
        Per saperne di più
      </button>
    </div>
  </div>

  <button
  className="
    ml-auto 
    self-stretch 
    flex items-center justify-center
    bg-stone-500 hover:bg-stone-500/75
    text-white text-[25px]
    px-1
    rounded-r-xl        /* angoli arrotondati solo a destra */
  "
  onClick={() => removeItem(vino.idVino)}
>
  <IoRemove />

</button>

</div>


    </>
  )
}

export default ItemVino