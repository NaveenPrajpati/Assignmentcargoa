import React, {  } from 'react'
import { useEffect } from 'react'
import { useState } from 'react'
import { FaWindowClose } from "react-icons/fa";
import { getAllMessages, getTransporter, sendMessage } from '../service/MessageService'
import Navbar from '../components/Navbar';
import { AiOutlineMessage } from 'react-icons/ai';

export default function HomepageManufacturer() {
    
const[orderId,setOrderId]=useState('')
const[user,setUser]=useState('')
const[transporter,setTransporter]=useState([])
const[messageBox,setmessageBox]=useState(false)
const[messages,setMessages]=useState([''])
const[showMessage,setShowMessage]=useState(false)

    const[manufactuerData,setManufactuerData]=useState({
        orderId:'',
        to:'',
        from:'',
        quantity:'',
        address:'',
        transporter:'',
        price:'',
        creator:''
    })

    function handleClose(){
      setmessageBox(false)
    }

    useEffect(()=>{
        const fetchData = async () => {
       await getTransporter()
       .then(res=>{
        console.log(res.data)
        setTransporter(res.data.transporters)
    })
        .catch(error=>console.log(error))
}
fetchData()
    },[])

    useEffect(()=>{
         const user = JSON.parse(localStorage.getItem('userData')).user;
          setUser(user);
     const fetchAllMessages = async () => {
        try {
         
          const response = await getAllMessages();
          const filteredMessages = response.data.messages.filter(
            (message) => message.creator === user.id && message.price !== ''
          );
    
          setMessages(filteredMessages);
        } catch (error) {
          console.log(error);
        }
      };
       fetchAllMessages()
    },[])

    

    function handleChange(event){
setManufactuerData({...manufactuerData,[event.target.name]:event.target.value})
       
    }

   async function handleSubmit(event){
        // let id= JSON.parse(localStorage.getItem('userData')).user.id
        // console.log(id)
        setManufactuerData(pre=>{return {...pre,creator:user.id}})
console.log(user.id)
        console.log(manufactuerData)
        await sendMessage(manufactuerData)
        .then(res=>{
console.log(res.data)
        })
             .catch(error=>console.log(error))
        
    
    }
    

    return (
    
            <div className=' bg-slate-200 mx-auto relative p-2 rounded-3xl shadow-2xl shadow-black drop-shadow-2xl font-semibold  '>

<Navbar user={user}/>
        
            <div className=" mx-auto  flex  items-center justify-around px-2">
               {messages.length===0?<div>
                <h1>no message from transporter</h1>
               </div>:  <div>
{messages?.map((message,index)=>(
    <div key={index} onClick={()=>setShowMessage(!showMessage)} className='flex gap-2'>
    <AiOutlineMessage  className='text-2xl cursor-pointer'/>{message.orderId}
    {showMessage && <div>
    <p>{message.to}</p>
    <p>{message.from}</p>
    <p>{message.quantity}</p>
    <p>{message.price}</p>

    </div> }
    </div>
    
))}
                </div>
                }


               <div>
<button onClick={()=>setmessageBox(true)}>send message</button>
              {messageBox &&  <div className=" px-6 py-6 rounded shadow-md text-black w-[500px]">
                <FaWindowClose className='text-red-400 text-2xl' onClick={handleClose}/>
                    <h1 className="mb-8 text-3xl text-center">Send message to transporter</h1>
                    <input 
                        type="text"
                        className="block border border-grey-light w-full p-2 rounded mb-4"
                        name="orderId"
                        // value={orderId}
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
                        // value={user}
                        onChange={handleChange}

                        placeholder="from" />

                        <select onChange={handleChange} name='quantity'>
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
                        
                    <select className='' name='transporter' onChange={handleChange}>
                    <option value=''>Transporters</option>
                        {transporter?.map((li,index)=>(
                            <option key={index} value={li.id} >
                            {li.name}
                            </option>
                        ))}
                </select>
                <br />

               
                   
              <button onClick={handleSubmit}>send</button>

                    
                </div>}
               </div>
            </div>
        </div>
          
    )
}
