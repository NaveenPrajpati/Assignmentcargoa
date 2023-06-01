import React from 'react'
import { Link } from 'react-router-dom'

import image1 from '../images/create.png'
import image2 from '../images/instagram-stories.png'

export default function Navbar({user}) {

  



  function handleLogin(event){
    event.preventDefault();
   

  }

  const handleSearch=(event)=>{
  }


  return (
    <div>
    <nav className='min-w-[350px] w-full sm:h-16 gap-2 p-2 shadow-2xl flex flex-col sm:flex-row sm:justify-around  mb-5 rounded-2xl bg-slate-300'>
{user}
  


    </nav>

    </div>
  )
}
