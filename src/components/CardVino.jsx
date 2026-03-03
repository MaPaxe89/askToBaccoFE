import { GiEarthAfricaEurope } from "react-icons/gi";
import { FaEuroSign } from "react-icons/fa";
import { PiWineFill } from "react-icons/pi";
import { PiFarmBold } from "react-icons/pi";
import { FaRegCalendarAlt } from "react-icons/fa";
import { tipologiaVino }  from "../utilitis/utils";




const CardVino = ({vino}) =>{


    return(
    <>

    
       <div className="relative flex w-auto p-3 h-auto bg-[#3d2e379f] rounded-2xl shadow-lg gap-5 mb-10"> 

    {/* Badge incastrato in alto a destra */}
    <div className="absolute top-0 right-0 bg-[#462b3d9f] text-white
                    rounded-bl-xl px-3 py-1 w-auto h-8 text-lg font-bold">
        <p>ORDINE: {vino.posizione}</p>
    </div>
    

     <div className="relative  w-[250px] h-[250px] flex items-center justify-center text-center rounded-xl overflow-visible">
  <div
    className="absolute top-0 inset-0 rounded-xl"
    style={{
      backgroundImage: `url('/images/thumb.jpg')`,
      backgroundSize: 'cover',
      backgroundPosition: 'center',
      filter: 'blur(1px)',
    }}
  ></div>

  <img
    src={`/images/${vino.path}`}
    alt="vino"
    className="absolute w-[180px]  transition-transform duration-500  ease-in-out transform hover:scale-150 hover:rotate-3 hover:z-50"
  />
</div>    
    

    <div className="w-full text-left">
        <h2 className="text-[25px] font-bold">{vino.nome}</h2>

        <label className="font-bold">Descrizione:</label>
        <p>{vino.descrizione}</p>

        <div className="grid grid-cols-5 gap-5  mt-3">
            
            <p className="flex items-center gap-1">
              <i className=""><PiFarmBold /></i>
               {vino.cantina}</p>
            <p className="flex items-center gap-1">
              <i className=""><FaRegCalendarAlt /></i>
              {vino.anno}</p>
            <p className="flex items-center gap-1">
              <i className=""><GiEarthAfricaEurope /></i>
              {vino.regione}</p>
            <p className="flex items-center gap-1">
              <i className=""><FaEuroSign /></i> 
              {vino.prezzo}</p>
            <p className="flex capitalize items-center gap-1">
              <i className=""><PiWineFill /></i>{ tipologiaVino(vino.fkTipologia)}</p>
        </div>

        <div className="flex rounded-b-4xl p-1 mt-3">
            <button className="w-auto text-[11px] p-2 bg-amber-900 text-white rounded">
                download
            </button>
        </div>
    </div>
</div>




    </>
    )
}

export default CardVino;