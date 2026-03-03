import { useLocation } from "react-router-dom";
import CardVino from "../components/CardVino";

const CardVinoPage = () =>{
  
  const location = useLocation();
   const viniOrdinati = location.state?.viniOrdinati || []; 

    return (
        <>
            <div className=" bg-amber-700 w-full"> ( button download scheda sequenza) - ( )  </div>
            {
              viniOrdinati.map((vino)=>(
                <CardVino key={vino.idVino} vino={vino} ></CardVino>
              ))
         }
            
        </>
    )
}

export default CardVinoPage;