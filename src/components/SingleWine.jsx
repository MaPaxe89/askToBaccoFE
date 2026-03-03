import React, { useEffect, useState } from 'react'

import { IoClose } from "react-icons/io5";
const SingleWine = ({vino, setShow}) => {

  const [showAnim, setShowAnim] = useState(false)
  

const chiudi = () =>{
  setShow(prev => !prev)
}

useEffect(() => {
    setTimeout(() => setShowAnim(true), 10)
  }, [])

if (!vino) {
    return     
  }
  
  return (
    <div
      className={`
        shadow-md rounded-md p-3 
        transition-all duration-1200 ease
        ${showAnim ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-35'}
      `}
    >
      <div className='flex justify-between'>
        <h2 className='text-left font text-[70px]'>{vino.nome}</h2>
        <i onClick={chiudi} className="p-1 w-7 h-7 flex items-center justify-center cursor-pointer rounded text-pink-700">
          <IoClose />
        </i>
      </div>
      <p className='text-left'>{vino.descrizione}</p>
      <div className="flex w-60">
        <img src={`/images/${vino.path}`} alt="img" />
      </div>
    </div>
  );
};

export default SingleWine