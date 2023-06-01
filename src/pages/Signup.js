import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { authUser, registerUser } from '../service/UserService';


function Signup() {
    const [isActive, setIsActive] = useState(true);
    const navigate=useNavigate()
    const[otpbtn,setOtpbtn]=useState(false)
    const [signupData,setSignupData]=useState({
        firstName:"",
        lastName:"",
        email:"",
        password:"",
        confpass:"",
        userType:"",
        otp:""
    })

    function handleChange(event){
        setSignupData({...signupData,[event.target.name]:event.target.value});
        
        if(isActive==false){
          setSignupData(pre=>{return {...pre,userType:'admin'}});}
          else{
            setSignupData(pre=>{return {...pre,userType:'public'}});}

    }


    function authhandle(event){
        event.preventDefault();
    // authUser(signupData)
    // .then(res=>{
       
    // if(res.status==200)
    //   setOtpbtn(true)})
    // .catch(error=>{
    //     console.log(error)
    // })
    }
    function savehandle(event){
        event.preventDefault();
    registerUser(signupData)
    .then(res=>{
        if(res.status===201)
        navigate('/login')
    })
    .catch(error=>{
        console.log(error)
    })
    }


   

  

    const toggleButton = () => {
      setIsActive(!isActive);
      
    };

  return (
    <div>
    {/* <Navbar/> */}
    <div className="mt-20 flex flex-col">
            <div className="container max-w-sm mx-auto flex-1 flex flex-col items-center justify-center px-2">
                <div className=" px-6 py-6 rounded shadow-md text-black w-full">
                    <h1 className="mb-8 text-3xl text-center">Sign up</h1>

                    <div>
              <label htmlFor="email" className="block text-sm font-medium leading-6 text-gray-900">
                Loging As
              </label>
              <div
                className={`p-1 rounded-md w-fit  bg-gray-200 mt-2 cursor-pointer`}
                onClick={toggleButton}
              >
                <div className='flex relative justify-between gap-3 items-center px-2'>
                  <p className={`mx-1`}>Transporter</p>

                  <div
                    className={`w-fit absolute  h-6 rounded-md bg-green-400 text-white px-1 font-serif font-semibold ${isActive ? 'left-0 ' : 'right-0'
                      } shadow-md`}
                  >{`${isActive ? 'Transporter' : 'Manufacturer'}`}</div>

                  <p className={`mx-1`}>Manufacturer</p>
                </div>
              </div>
            </div>

                    <input 
                        type="text"
                        className="block border border-grey-light w-full p-2 rounded mb-4"
                        name="firstName"
                        placeholder="First Name" 
                        onChange={handleChange}
                        />
                    <input 
                        type="text"
                        className="block border border-grey-light w-full p-2 rounded mb-4"
                        name="lastName"
                        placeholder="Last Name" 
                        onChange={handleChange}
                        />

                    <input 
                        type="text"
                        className="block border border-grey-light w-full p-2 rounded mb-4"
                        name="email"
                        onChange={handleChange}

                        placeholder="Email" />

                    <input 
                        type="password"
                        className="block border border-grey-light w-full p-2 rounded mb-4"
                        name="password"
                        placeholder="Password"
                        onChange={handleChange}
                         />
                        
                        
                        <input 
                        type="password"
                        className="block border border-grey-light w-full p-2 rounded mb-4"
                        name="confpass"
                        placeholder="Confirm Password" 
                        onChange={handleChange}
                        />

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
             

                    
                </div>
                

                <div className="text-grey-dark mt-4">
                    Already have an account? 
                    <Link className="no-underline border-b border-blue text-blue-600" to={"/"}>
                        Log in
                    </Link>.
                </div>
            </div>
        </div>
        </div>
  )
}

export default Signup