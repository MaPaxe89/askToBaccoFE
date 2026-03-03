import React from 'react'

const ViniSelezionati = (listaVini) => {

    
  return (
    <div>
        { listaVini.length > 0 && (
  <div>
    <h3>Vini selezionati:</h3>
    <div className='flex flex-col  space-y-4'>
      {
        listaVini.map((vino)=>(
              
          <ItemVino  key={vino.idVino} vino={vino} removeItem={removeItem} setVinoCliccato={setVinoCliccato}/>
              
        ))
      }
    </div>
    {listaVini.length > 1 && (
      <button className="mt-4 text-sm hover:bg-amber-900 transition ease-in-out duration-350 px-4 py-2 bg-amber-950 text-white rounded" onClick={generaSequenza}>
        Genera Sequenza
      </button>
    )}
     
  </div>
  
  )} 


    </div>
  )
}

export default ViniSelezionati