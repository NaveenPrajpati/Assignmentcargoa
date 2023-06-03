import React, { useContext, useEffect, useState } from 'react'
import { getAllMessages, updataMessage } from '../service/MessageService'
import {FaSadCry, FaWindowClose} from 'react-icons/fa'
import {AiOutlineMessage} from 'react-icons/ai'
import Navbar from '../components/Navbar'
import { MyContext } from '../App'
import { toast } from 'react-hot-toast'


function HomepageTransporter() {

const[user,setUser]=useState('')

const[sendMessage,setSendMessage]=useState(false)
const[messages,setMessages]=useState([''])
const[showMessage,setShowMessage]=useState()
const[showMessageFrom,setShowMessageFrom]=useState(false)
const[price,setPrice]=useState('')

const {search,setSearch}=useContext(MyContext)


if(search){
 const newMess= messages.filter(it=>(it.orderId===search || it.to===search || it.from===search))
 setMessages(newMess)
}

  function handleClose(){
    setShowMessageFrom(false)
  }

  useEffect(()=>{
   let user= JSON.parse(localStorage.getItem('userData')).user

   setUser(user)
  const fetchAllMessages=async()=>{
     await getAllMessages()
     .then(res=>{
        setMessages(res.data.messages)
      })
        .catch(error=>console.log(error))
  }
  fetchAllMessages()
}
  ,[])


  function handleChange(event){
     setPrice(event.target.value)
  }

 async function handleReply(id){
    await updataMessage(id,{price:price})
    .then(res=>{
      toast('replied Successfully')
      setShowMessageFrom(false)
      console.log(res.data.message)
    })
      .catch(error=>console.log(error))
  }

  return (
  
    
    <div className='bg-slate-200 mx-auto relative p-2 h-screen '>
<Navbar user={user}/>

<div className='mx-auto  flex gap-2  justify-between px-2'>
<div className='sm:w-2/5'>
                      {messages.length>0 && messages.filter(li=>li.transporter===user.id).map((li,index)=>(
                          <div key={index} onClick={()=>{
                            setShowMessageFrom(true)
                            setShowMessage(li)
                            
                            }} className='cursor-pointer bg-gray-200 m-1 shadow-lg p-2 rounded-md flex justify-between items-center font-semibold hover:bg-gray-300'>
                            <div  className='flex gap-1 items-center'>
                          <AiOutlineMessage  className=''/>{li.orderId}
                            </div>
                            <p>{li.price?'replied':'not answered'}</p>
                          </div>
                      ))}
</div>

       
        {showMessageFrom &&  <div className=" mx-auto flex flex-col items-center justify-center px-2">
          <FaWindowClose className='text-red-400  left-5 text-2xl' onClick={handleClose}/>
              <form onSubmit={()=>handleReply(showMessage._id)} className=" px-6 py-6 rounded shadow-md text-black w-full">
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
                      required
                      onChange={handleChange}
                       />
                      

                  <button
                    type='submit'
                      className="w-full text-center py-2 rounded bg-green text-white bg-green-400 focus:outline-none my-1"
                  >Reply</button>
              </form>
              

            
          </div>}
      </div>
      </div>
          
  )
}

export default HomepageTransporter