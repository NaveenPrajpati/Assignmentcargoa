import React from 'react'
import { Link, useNavigate } from 'react-router-dom'

import image1 from '../images/create.png'
import image2 from '../images/instagram-stories.png'

export default function Navbar({user}) {

  
const navigate=useNavigate()


  function handleLogin(event){
    event.preventDefault();
   localStorage.clear()
navigate('/')

  }

  const handleSearch=(event)=>{
  }


  return (
    <div>
    <nav className='min-w-[350px] w-full sm:h-16 gap-2 p-2 shadow-2xl flex flex-col sm:flex-row sm:justify-around  mb-5 rounded-2xl bg-slate-300'>

<div className='flex gap-2'>
<h1>{user.role}</h1>
<p>{user.name}</p>
</div>

<button onClick={handleLogin}>logout</button>


    </nav>

    </div>
  )
}
