import React, {  } from 'react'
import { useEffect } from 'react'
import { useState } from 'react'

import { FaWindowClose } from "react-icons/fa";
import { useRef } from 'react'
import { getAllMessages, getTransporter } from '../service/MessageService'

export default function HomepageManufacturer() {
    const [comment, setComment] = useState('')
    const commentRef=useRef();
const[orderId,setOrderId]=useState('')
const[user,setUser]=useState('')
const[transporter,setTransporter]=useState()
const[sendMessage,setSendMessage]=useState(false)
const[messages,setMessages]=useState([])

    const[manufactuerData,setManufactuerData]=useState[{
        orderId:'',
        to:'',
        from:'',
        quantity:'',
        address:'',
        transporter:''
    }]

    function handleClose(){
      setSendMessage(false)
    }

    useEffect(async()=>{
       await getTransporter()
       .then(res=>{
        console.log(res.data)
        setTransporter(res.data)})
        .catch(error=>console.log(error))
    },[])
    useEffect(async()=>{
        // let id= JSON.parse(localStorage.getItem('userData')).user.id
          await getAllMessages()
          .then(res=>{
            //  if(res.data.message.creator==id && res.data.message.price!='')
             setMessages(res.data.messages)})
             .catch(error=>console.log(error))
       },[])

    

    function handleChange(event){
setManufactuerData({...manufactuerData,[event.target.name]:event.target.value})
       
    }

    function handleSubmit(event){
      setComment(event.target.value)
    }
    

    return (
    
            <div className=' bg-slate-200 mx-auto relative p-2 rounded-3xl shadow-2xl shadow-black drop-shadow-2xl font-semibold sm:w-[80%] '>

            
        
            <div className="container max-w-sm mx-auto flex-1 flex flex-col items-center justify-center px-2">
               {messages.length==0?<div>
                <h1>no message from transporter</h1>
               </div>:  <div>
{messages?.map((message,index)=>(
    <div key={index} >
message
    </div>
))}
                </div>}
               

                <div className=" px-6 py-6 rounded shadow-md text-black w-full">
                <FaWindowClose className='text-red-400 absolute left-5 text-2xl' onClick={handleClose}/>
                    <h1 className="mb-8 text-3xl text-center">Send message to transporter</h1>
                    <input 
                        type="text"
                        className="block border border-grey-light w-full p-2 rounded mb-4"
                        name="orderId"
                        value={orderId}
                        placeholder="orderId" 
                        onChange={handleChange}
                        />
                    <input 
                        type="text"
                        className="block border border-grey-light w-full p-2 rounded mb-4"
                        name="to"
                        placeholder="send To" 
                        onChange={handleChange}
                        />

                    <input 
                        type="text"
                        className="block border border-grey-light w-full p-2 rounded mb-4"
                        name="from"
                        value={user}
                        onChange={handleChange}

                        placeholder="Transporter" />

                        <select onChange={handleChange}>
                            <option value="">Quantity</option>
                            <option value="1">1 ton</option>
                            <option value="2">2 ton</option>
                            <option value="3">3 ton</option>
                        </select>

                    <input 
                        type="text"
                        className="block border border-grey-light w-full p-2 rounded mb-4"
                        name="address"
                        placeholder="street,state"
                        onChange={handleChange}
                         />
                        
                    <select className=''>
                    <option value=''>Transporters</option>
                        {transporter.map((li,index)=>(
                            <option key={index} value={li.id} onClick={setTransporter}>
                            {li.name}
                            </option>
                        ))}
                </select>
                   
              

                    
                </div>

            </div>
        </div>
          
    )
}
