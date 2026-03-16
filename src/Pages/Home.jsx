import React, { useEffect, useState } from 'react'

import FormHome from '../components/FormHome'
import HeroHome from '../components/HeroHome'
import SingleWine from '../components/SingleWine'


export const Home = () => {

  const [vinoCliccato, setVinoCliccato] = useState(null)
  const [show, setShow] = useState(false)

  useEffect(() => {
     if (vinoCliccato != null){
      setShow(true);
     }
    },[vinoCliccato] );
  
  return (
    <>
    
    <div className="grid grid-cols-1   md:gap-9 p-5 md:grid-cols-3">
      {
        show ?  <div className='p-1 md:col-span-2'><SingleWine vino={vinoCliccato} setShow={setShow} /></div>
        : <div className='p-1 md:col-span-2'><HeroHome /></div>
      }
      
      <div className='p-1'><FormHome setVinoCliccato={setVinoCliccato} setShow={setShow}/></div>
      
      
    </div>
    
    
    </>
  )
}

export default Home