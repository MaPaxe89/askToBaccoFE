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
    <div className='grid grid-cols-1 md:grid-cols-4 sm:grid-cols-4 md:gap-1 mt-10 text-center items-center'>
      <div className='w-70 h-70 border-13 rounded border-[#3d2e379f]'>
        
        <img src="public\images\thumb.jpg" alt="" className='object-cover'/>
      </div>
      <div className='w-70 h-70 border-13 rounded border-[#3d2e379f]'> SONO BLOCCO 1</div>
      <div className='w-70 h-70 border-3 rounded border-[#3d2e379f]'>SONO BLOCCO 1</div>
      <div className='w-70 h-70 border-3 rounded border-[#3d2e379f]'>SONO BLOCCO 1</div>

    </div>
    
    </>
  )
}

export default Home