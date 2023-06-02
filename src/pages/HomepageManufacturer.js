import React, { useContext } from 'react'
import { useEffect } from 'react'
import { useState } from 'react'
import { FaWindowClose } from "react-icons/fa";
import { getAllMessages, getOrderId, getTransporter, sendMessage } from '../service/MessageService'
import Navbar from '../components/Navbar';
import { AiOutlineMessage } from 'react-icons/ai';
import { MyContext } from '../App';

export default function HomepageManufacturer() {

    const [orderId, setOrderId] = useState('')
    const [user, setUser] = useState('')
    const [transporter, setTransporter] = useState([])
    const [messageBox, setmessageBox] = useState(false)
    const [messages, setMessages] = useState([''])
    const [showMessage, setShowMessage] = useState(false)
    const [detail, setDetail] = useState({})

    const [manufactuerData, setManufactuerData] = useState({
        orderId: '',
        to: '',
        from: '',
        quantity: '',
        address: '',
        transporter: '',
        price: '',
        creator: ''
    })

    const {search,setSearch}=useContext(MyContext)
    
    // if(search){
       
    //    }

       useEffect(()=>{
        
       },[search])

    function handleClose() {
        setmessageBox(false)
    }

    useEffect(() => {
        const fetchData = async () => {
            await getTransporter()
                .then(res => {
                    console.log(res.data)
                    setTransporter(res.data.transporters)
                })
                .catch(error => console.log(error))
        }
        fetchData()
    }, [])

    useEffect(() => {
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

        if(search){
            const newMess = messages.filter(
                (message) =>
                  message.orderId.toLowerCase()?.includes(search) ||
                  message.to.toLowerCase()?.includes(search) ||
                  message.from.toLowerCase()?.includes(search)
              );
              setMessages(newMess);
        }else
        fetchAllMessages()

    }, [search])



    function handleChange(event) {
        setManufactuerData({ ...manufactuerData, [event.target.name]: event.target.value })

    }

    async function handleSubmit(event) {
        // let id= JSON.parse(localStorage.getItem('userData')).user.id
        // console.log(id)
        setManufactuerData(pre => { return { ...pre, creator: user.id } })
        console.log(user.id)
        console.log(manufactuerData)
        await sendMessage(manufactuerData)
            .then(res => {
                console.log(res.data)
            })
            .catch(error => console.log(error))


    }

    useEffect(() => {
        // const generateOrderId = () => {
        //   const alphanumericChars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890';
        //   let orderId = '';
        //   for (let i = 0; i < 5; i++) {
        //     const randomIndex = Math.floor(Math.random() * alphanumericChars.length);
        //     orderId += alphanumericChars[randomIndex];
        //   }
        //   setManufactuerData((pre) => ({ ...pre, orderId }));
        // };
        // generateOrderId();
        getOrderId()
        .then(res => {
            console.log(res.data.orderId)
            setManufactuerData((pre) => ({ ...pre, orderId:res.data.orderId }));
        })
        .catch(error => console.log(error))
        
      }, []);

    function handleDetail(message) {
        setShowMessage(true)
        setDetail(message)
    }


    return (

        <div className=' bg-slate-200 mx-auto relative p-2 h-screen  '>

            <Navbar user={user} />

            <div className=" mx-auto  flex gap-2  justify-between px-2">
                
                <div className='sm:w-2/5'>
                {messages.length === 0 ? <div className=''>
                    <h1>no messages</h1>
                </div> : <div className=' '>
                    {messages?.map((message, index) => (
                        <div key={index} onClick={() => handleDetail(message)} className='cursor-pointer bg-red-200 m-1 p-2 rounded-md flex gap-1 items-center font-semibold'>
                            <AiOutlineMessage className='text-2xl cursor-pointer' />{message.orderId}
                        </div>
                    ))}
                </div>
                }
</div>

                <div className='bg-purple-200 sm:w-1/2  p-2'>

                    {showMessage && <div className=' p-2 rounded-lg text-lg font-semibold '>
                    <FaWindowClose className='text-red-400 text-2xl cursor-pointer' onClick={()=>setShowMessage(false)} />
                        <p>Order Id- {detail.orderId}</p>
                        <p>To- {detail.to}</p>
                        <p>From- {detail.from}</p>
                        <p>quantity- {detail.quantity}</p>
                        <p>price- {detail.price}</p>

                    </div>}
                    {!showMessage && !messageBox &&  <button onClick={() => setmessageBox(true)} className='bg-blue-500 text-white px-1 font-semibold rounded-md'>send message</button>}

                    {!showMessage && messageBox && <div className=" px-6 py-6 rounded shadow-md text-black ">
                        <FaWindowClose className='text-red-400 text-2xl' onClick={handleClose} />
                        <h1 className="mb-8 text-3xl text-center">Send message to transporter</h1>
                        <input
                            type="text"
                            className="block border border-grey-light w-full p-2 rounded mb-4 uppercase"
                            name="orderId"
                            value={manufactuerData.orderId}
                            placeholder="order Id"
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

                        <select onChange={handleChange} name='quantity' className='w-full p-1 rounded-sm mb-2 outline-none'>
                            <option value="" className=''>Quantity</option>
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

                        <select name='transporter' onChange={handleChange} className='w-full p-1 rounded-sm mb-2 outline-none'>
                            <option value=''>Transporters</option>
                            {transporter?.map((li, index) => (
                                <option key={index} value={li.id} >
                                    {li.name}
                                </option>
                            ))}
                        </select>
                        <br />



                        <button onClick={handleSubmit} className='px-2 bg-blue-500 text-white font-semibold rounded-md'>send</button>


                    </div>}



                </div>
            </div>
        </div>

    )
}
