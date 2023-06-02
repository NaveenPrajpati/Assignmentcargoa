import React, { useContext } from 'react'
import { Link, useNavigate } from 'react-router-dom'

import image1 from '../images/create.png'
import image2 from '../images/instagram-stories.png'
import { AiOutlineFileSearch } from 'react-icons/ai'
import { MyContext } from '../App'

export default function Navbar({ user }) {

const {search,setSearch}=useContext(MyContext)
  const navigate = useNavigate()


  function handleLogin(event) {
    event.preventDefault();
    localStorage.clear()
    navigate('/')

  }

  function handleText(event){
setSearch(event.target.value)

  }

  const handleSearch = (event) => {

  }


  return (
    <div>
      <nav className='min-w-[350px] sm:h-16 gap-2 p-2 shadow-2xl flex flex-col sm:flex-row items-center sm:justify-between mb-5 px-5'>
        <p>messaging</p>
        <div className=' p-1 '>
          <input type="text" placeholder='search for orderId, To, From' onChange={handleText} className='p-1 rounded-lg'/>
          {/* <AiOutlineFileSearch onClick={handleSearch} className='text-2xl'/> */}
        </div>
        <div className='flex gap-2 items-center'>
          <h1>{user.role}</h1>
          <p>{user.name}</p>
        <button onClick={handleLogin} className='p-1 rounded-lg bg-blue-500 text-white'>logout</button>
        </div>
      </nav>
    </div>
  )
}
