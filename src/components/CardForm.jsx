import { useState } from "react";

function CardForm({addCity }){
    
    const [formData, setFormData] = useState ({
        title:"",
        descrizione:"",
        imgUrl:"",
        isVisited:false
    });

    const handleInputChange = (e)=>{

        // prende tramite l'evento e tutte le proprietà del form
        const{name, value, type, checked} = e.target;
        //inputValue si valorizza se type è di checkbox prendi i checked se è text prendi i value
        const inputValue = type == "checkbox" ? checked : value;
        setFormData({
            ...formData,
            [name] : inputValue,
            
        })
    }

    const handleSubmit = (e)=>{
        e.preventDefault();
        const city = {
        id: Math.random(),
        title : formData.title,
        isVisited : formData.isVisited,
        imgUrl : formData.imgUrl,
        descrizione : formData.descrizione
        };
        setFormData({
            
        title:"",
        descrizione:"",
        imgUrl:"",
        isVisited:false
            
        })
        addCity(city);
    }    

    
    return (    
    <>
    <form onSubmit={handleSubmit} className="flex flex-col gap-3 w-80 mb-10 bg-zinc-900 p-5 rounded-2xl">
        <div className="flex flex-col">
            <label>Title</label>
            <input type="text" name="title" value={formData.title} onChange={handleInputChange} className="bg-gray-600 rounded-md"></input>
        </div>
        <div className="flex flex-col">
            <label>Immagine</label>
            <input type="text" name="imgUrl" value={formData.imgUrl} onChange={handleInputChange} className="bg-gray-600 rounded-md"></input>
        </div>
        <div className="flex flex-col">
            <label>Descrizione</label>
            <textarea name="descrizione" value={formData.descrizione} onChange={handleInputChange} className=" bg-gray-600 rounded-md"></textarea>
        </div>
        <div className="flex flex-col">
            <label>Visitata?</label>
            <input type="checkbox" name="isVisited" checked={formData.isVisited} onChange={handleInputChange} className="bg-gray-600 rounded-md"></input>
        </div>   
        
        <button className="bg-amber-300">Aggiungi Card</button>
    </form>



    </>
    )
    
};

export default CardForm;