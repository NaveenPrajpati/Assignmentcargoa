import React, { createContext, useContext } from 'react'
import { useEffect } from 'react'
import { useState } from 'react'
import { useNavigate, Navigate, Link, NavLink } from 'react-router-dom'
import Navbar from '../components/Navbar'

import PostForm from '../components/PostForm'
import { useDispatch, useSelector } from 'react-redux'
import { FaWindowClose,FaCommentDots } from "react-icons/fa";
import { getAllComment, postDetailArray, setCommentdeta, setShowDetail } from '../redux/slices/postDetailSlice'
import Moment from 'react-moment'
import { createComment, setEnableDetail } from '../redux/slices/postsSlice'
import { useRef } from 'react'
import CommentList from '../components/CommentList'
import { getTransporter } from '../service/MessageService'

export default function PostDetail({showDetail}) {
    const [comment, setComment] = useState('')
    const commentRef=useRef();
const[orderId,setOrderId]=useState('')
const[user,setUser]=useState('')
const[transporter,setTransporter]=useState()
const[sendMessage,setSendMessage]=useState(false)

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
       .then(res=>setTransporter(res.data))
    },[])


    function handleChange(event){
setManufactuerData({...manufactuerData,[event.target.name]:event.target.value})
       
    }

    function handleSubmit(event){
      setComment(event.target.value)
    }
    

    return (
    
            <div className=' bg-slate-200 mx-auto relative p-2 rounded-3xl shadow-2xl shadow-black drop-shadow-2xl font-semibold sm:w-[80%] '>

            <FaWindowClose className='text-red-400 absolute left-5 text-2xl' onClick={handleClose}/>
            <div className="mt-20 flex flex-col">
            <div className="container max-w-sm mx-auto flex-1 flex flex-col items-center justify-center px-2">
                <div className=" px-6 py-6 rounded shadow-md text-black w-full">
                    <h1 className="mb-8 text-3xl text-center">Sign up</h1>

        

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
                        
                    <ul className=''>
                        {transporter.map((li,index)=>(
                            <li key={index} onClick={setTransporter}>
                            {li}
                            </li>
                        ))}
</ul>
                    <button
                       onClick={authhandle}
                        className="w-full text-center py-2 rounded bg-green text-white bg-green-400 focus:outline-none my-1"
                    >Create Account</button>
                  {otpbtn &&  <div className='flex items-center justify-between my-4'>
                     <input 
                        type="text"
                        className="border border-grey-light  p-2 rounded "
                        name="otp"
                        placeholder="enter OTP" 
                        onChange={handleChange}
                        />
                        <button onClick={savehandle} className='p-2 rounded bg-green text-white bg-blue-400 hover:bg-blue-500'>validate
                        </button>
                        </div>}
                    <button
                      
                        className="w-full text-center py-2 rounded bg-green text-white bg-blue-500 focus:outline-none my-1"
                    >Signup with google</button>

                    
                </div>
                

                <div className="text-grey-dark mt-4">
                    Already have an account? 
                    <Link className="no-underline border-b border-blue text-blue-600" to={"/login"}>
                        Log in
                    </Link>.
                </div>
            </div>
        </div>
            </div>
    )
}
