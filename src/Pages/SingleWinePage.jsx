import { useLocation } from "react-router-dom";
import SingleWine from "../components/SingleWine";

const SingleWinePage = () => {

    const location = useLocation();
    const {vino} = location.state;
    return (
        <>
        <h1>Sono una singolare pagina {vino.nome} </h1>
        
        </>
    )
}


export default SingleWinePage;