import React, { useEffect, useState } from 'react'
import { getAllMessages, updataMessage } from '../service/MessageService'
import {FaWindowClose} from 'react-icons/fa'
import {AiOutlineMessage} from 'react-icons/ai'
import Navbar from '../components/Navbar'


function HomepageTransporter() {

const[user,setUser]=useState('')

const[sendMessage,setSendMessage]=useState(false)
const[messages,setMessages]=useState([''])
const[showMessage,setShowMessage]=useState()
const[showMessageFrom,setShowMessageFrom]=useState(false)
const[price,setPrice]=useState('')


  const[messageData,setMessageData]=useState({
      orderId:'',
      to:'',
      from:'',
      quantity:'',
      address:'',
 
      price:''
  })

  function handleClose(){
    setShowMessageFrom(false)
  }

  useEffect(()=>{
   let user= JSON.parse(localStorage.getItem('userData')).user
   console.log(user)
   setUser(user)
  const fetchAllMessages=async()=>{
     await getAllMessages()
     .then(res=>{
        // if(res.data.transporter==user.id)
      
        console.log(res.data.messages)
        setMessages(res.data.messages)
      })
        .catch(error=>console.log(error))
  }
  fetchAllMessages()
}
  ,[])


  function handleChange(event){
// setMessageData({...messageData,[event.target.name]:event.target.value})
     setPrice(event.target.value)
  }

 async function handleReply(id){
  console.log(id)
    await updataMessage(id,{price:price})
    .then(res=>{
      // if(res.data.transporter==user.id)
    
      console.log(res.data.message)
    })
      .catch(error=>console.log(error))
  }

  

  return (
  
    
    <div className=' bg-slate-200 h-screen mx-auto  p-2 rounded-3xl shadow-2xl shadow-black drop-shadow-2xl font-semibold '>
<Navbar user={user}/>

<div className='flex gap-2'>
<ul className=''>
                      {messages.length>0 && messages.filter(li=>li.transporter===user.id).map((li,index)=>(
                          <li key={index} onClick={()=>{
                            setShowMessageFrom(true)
                            setShowMessage(li)
                            
                            }} className='flex'>
                          {li.orderId}<AiOutlineMessage  className='text-2xl cursor-pointer'/>
                          </li>
                      ))}
</ul>

       
        {showMessageFrom &&  <div className=" mx-auto flex flex-col items-center justify-center px-2">
          <FaWindowClose className='text-red-400  left-5 text-2xl' onClick={handleClose}/>
              <div className=" px-6 py-6 rounded shadow-md text-black w-full">
                  <h1 className="mb-8 text-3xl text-center">Send to Manufacturer</h1>
                  <input 
                      type="text"
                      className="block border border-grey-light w-full p-2 rounded mb-4"
                      name="orderId"
                      value={showMessage.orderId}
                      placeholder="orderId" 
                      onChange={handleChange}
                      readOnly
                      />
                  <input 
                      type="text"
                      className="block border border-grey-light w-full p-2 rounded mb-4"
                      name="to"
                      placeholder="send To" 
                      onChange={handleChange}
                      readOnly
                      value={showMessage.to}
                      />

                  <input 
                      type="text"
                      className="block border border-grey-light w-full p-2 rounded mb-4"
                      name="from"
                      onChange={handleChange}
                      readOnly
                      value={showMessage.from}
                      placeholder="Transporter" />
                  <input 
                      type="text"
                      className="block border border-grey-light w-full p-2 rounded mb-4"
                      name="quantity"
                      onChange={handleChange}
                      readOnly
                      value={showMessage.quantity+" ton"}
                      placeholder="quantity" />

                      {/* <select onChange={handleChange} readOnly>
                          <option value="">Quantity</option>
                          <option value="1">1 ton</option>
                          <option value="2">2 ton</option>
                          <option value="3">3 ton</option>
                      </select> */}

                  <input 
                      type="text"
                      className="block border border-grey-light w-full p-2 rounded mb-4"
                      name="address"
                      readOnly
                      value={showMessage.address}
                      placeholder="street,state"
                      onChange={handleChange}
                       />
                      
                  <input 
                      type="text"
                      className="block border border-grey-light w-full p-2 rounded mb-4"
                      name="price"
                      placeholder="price"
                      onChange={handleChange}
                       />
                      

                  <button
                     onClick={()=>handleReply(showMessage._id)}
                      className="w-full text-center py-2 rounded bg-green text-white bg-green-400 focus:outline-none my-1"
                  >Reply</button>
                

                  
              </div>
              

            
          </div>}
      </div>
      </div>
          
  )
}

export default HomepageTransporter