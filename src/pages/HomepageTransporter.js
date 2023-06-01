import React, { useEffect, useState } from 'react'
import { getAllMessages, updataMessage } from '../service/MessageService'
import {FaWindowClose} from 'react-icons/fa'
import {AiOutlineMessage} from 'react-icons/ai'
import Navbar from '../components/Navbar'


function HomepageTransporter() {
  const [comment, setComment] = useState('')
const[orderId,setOrderId]=useState('')
const[user,setUser]=useState('')

const[sendMessage,setSendMessage]=useState(false)
const[messages,setMessages]=useState([''])
const[showMessage,setShowMessage]=useState(false)



  const[messageData,setMessageData]=useState({
      orderId:'',
      to:'',
      from:'',
      quantity:'',
      address:'',
 
      price:''
  })

  function handleClose(){
    setShowMessage(false)
  }

  useEffect(async()=>{
  //  let user= JSON.parse(localStorage.getItem('userData')).user
  //  console.log(user)
     await getAllMessages()
     .then(res=>{
        // if(res.data.transporter==user.id)
        setMessages(res.data.messages)
      })
        .catch(error=>console.log(error))
  }
  ,[])


  function handleChange(event){
setMessageData({...messageData,[event.target.name]:event.target.value})
     
  }

 async function handleReply(id,messageData){
    await updataMessage(id,messageData)
  }

  

  return (
  
    
    <div className=' bg-slate-200 h-screen mx-auto  p-2 rounded-3xl shadow-2xl shadow-black drop-shadow-2xl font-semibold '>
<Navbar user={'user'}/>

<div className='flex gap-2'>
<ul className=''>
                      {messages.length>0 && messages.map((li,index)=>(
                          <li key={index} onClick={()=>setShowMessage(true)} className='flex'>
                          {li.orderId}<AiOutlineMessage onClick={()=>setShowMessage(true)} className='text-2xl cursor-pointer'/>
                          </li>
                      ))}
</ul>

       
        {showMessage &&  <div className=" mx-auto flex flex-col items-center justify-center px-2">
          <FaWindowClose className='text-red-400  left-5 text-2xl' onClick={handleClose}/>
              <div className=" px-6 py-6 rounded shadow-md text-black w-full">
                  <h1 className="mb-8 text-3xl text-center">Send to transporter</h1>
                  <input 
                      type="text"
                      className="block border border-grey-light w-full p-2 rounded mb-4"
                      name="orderId"
                      value={orderId}
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
                      />

                  <input 
                      type="text"
                      className="block border border-grey-light w-full p-2 rounded mb-4"
                      name="from"
                      onChange={handleChange}
                      readOnly
                      placeholder="Transporter" />

                      <select onChange={handleChange} readOnly>
                          <option value="">Quantity</option>
                          <option value="1">1 ton</option>
                          <option value="2">2 ton</option>
                          <option value="3">3 ton</option>
                      </select>

                  <input 
                      type="text"
                      className="block border border-grey-light w-full p-2 rounded mb-4"
                      name="address"
                      readOnly
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
                     onClick={handleReply}
                      className="w-full text-center py-2 rounded bg-green text-white bg-green-400 focus:outline-none my-1"
                  >Reply</button>
                

                  
              </div>
              

            
          </div>}
      </div>
      </div>
          
  )
}

export default HomepageTransporter