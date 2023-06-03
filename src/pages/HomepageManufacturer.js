import React, { useContext } from 'react'
import { useEffect } from 'react'
import { useState } from 'react'
import { FaWindowClose } from "react-icons/fa";
import { getAllMessages, getOrderId, getTransporter, sendMessage } from '../service/MessageService'
import Navbar from '../components/Navbar';
import toast, { Toaster } from 'react-hot-toast';
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
        creator:''
    })

    const {search,setSearch}=useContext(MyContext)


    function handleClose() {
        setmessageBox(false)
    }

    useEffect(() => {
        const fetchData = async () => {
            await getTransporter()
                .then(res => {
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
                    (message) => message.creator === user.id 
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

    }, [search,messages])



    function handleChange(event) {
        
        setManufactuerData({ ...manufactuerData, [event.target.name]: event.target.value })
     

    }

    async function handleSubmit(event) {
     event.preventDefault();
  console.log(user.id);
  const updatedData = { ...manufactuerData, creator: user.id };
  console.log(updatedData);
   
        await sendMessage(updatedData)
            .then(res => {
                console.log(res.data)
                toast('message sent successfully');
                setmessageBox(false)
            })
            .catch(error => console.log(error))
    }

    useEffect(() => {
      
        getOrderId()
        .then(res => {
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
                        <div key={index} onClick={() => handleDetail(message)} className='cursor-pointer bg-gray-200 m-1 p-2 rounded-md flex justify-between items-center font-semibold shadow-lg hover:bg-gray-300'>
                            <div className='flex gap-1'>
                            <AiOutlineMessage className='text-2xl cursor-pointer' />{message.orderId}
                            </div>
                            <p className=''>{message.price?'replied':'sent'}</p>
                        </div>
                    ))}
                </div>
                }
</div>

                <div className=' sm:w-1/2  p-2'>

                    {showMessage && <div className=' p-2 rounded-lg text-lg font-semibold '>
                    <FaWindowClose className='text-red-400 text-2xl cursor-pointer' onClick={()=>setShowMessage(false)} />
                        <p>Order Id- {detail.orderId}</p>
                        <p>To-       {detail.to}</p>
                        <p>From-     {detail.from}</p>
                        <p>quantity- {detail.quantity}</p>
                        <p>price-    {detail.price}</p>

                    </div>}
                    {!showMessage && !messageBox &&  <button onClick={() => setmessageBox(true)} className='bg-blue-500 text-white px-1 font-semibold rounded-md'>send message</button>}

                    {!showMessage && messageBox && <form onSubmit={handleSubmit} className=" px-6 py-6 rounded shadow-md text-black ">
                        <FaWindowClose className='text-red-400 text-2xl' onClick={handleClose} />
                        <h1 className="mb-8 text-3xl text-center">Send message to transporter</h1>
                        <input
                            type="text"
                            className="block border border-grey-light w-full p-2 rounded mb-4 uppercase"
                            name="orderId"
                            value={manufactuerData.orderId}
                            placeholder="order Id"
                            required
                            onChange={handleChange}
                        />
                        <input
                            type="text"
                            className="block border border-grey-light w-full p-2 rounded mb-4"
                            name="to"
                            placeholder="send To"
                            required
                            onChange={handleChange}
                        />


                        <input
                            type="text"
                            className="block border border-grey-light w-full p-2 rounded mb-4"
                            name="from"
                            onChange={handleChange}
                            required
                            placeholder="from" />

                        <select onChange={handleChange} name='quantity' className='w-full p-1 rounded-sm mb-2 outline-none' required>
                            <option value="" className='' >Quantity</option>
                            <option value="1">1 ton</option>
                            <option value="2">2 ton</option>
                            <option value="3">3 ton</option>
                        </select>

                        <input
                            type="text"
                            className="block border border-grey-light w-full p-2 rounded mb-4"
                            name="address"
                            placeholder="street,state"
                            required
                            onChange={handleChange}
                        />

                        <select name='transporter' onChange={handleChange} className='w-full p-1 rounded-sm mb-2 outline-none' required>
                            <option value=''>Transporters</option>
                            {transporter?.map((li, index) => (
                                <option key={index} value={li.id} >
                                    {li.name}
                                </option>
                            ))}
                        </select>
                        <br />



                        <button type='submit' className='px-2 bg-blue-500 text-white font-semibold rounded-md'>send</button>


                    </form>}



                </div>
            </div>
        </div>

    )
}
