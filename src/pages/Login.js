import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import {  loginUser } from '../service/UserService';




export default function Login() {

  const [resetOpt, setResetOpt] = useState(false)



  const [loginData, setloginData] = useState({
    email: "",
    password: ""
  })
  const [resetData, setResetData] = useState({
    otp: "",
    newPassword: "",
    confNewPassword: ""
  })

  const navigate = useNavigate();

  function handleChange(event) {
    setloginData({ ...loginData, [event.target.name]: event.target.value });
  }

  function handleChangePass(event) {
    setResetData({ ...resetData, [event.target.name]: event.target.value });

  }




  function handleNewPassword(event) {
    event.preventDefault()
    // createNewPassword(resetData)
    //   .then(res => 
    //     { console.log(res.data)
    //     alert(res.data.message) 
    //   setResetOpt(false)
    //   })
    //   .catch(error => {
    //     console.log("request mai error aara hai")
    //     console.log(error)
    //   })
  }


  function handle(event) {
    event.preventDefault();

    loginUser(loginData)
      .then(res => {
        localStorage.setItem('userData', JSON.stringify(res.data))
        console.log(res.data)
        if(res.data.success==true)
        if(res.data.user.role=='transporter')
          navigate("/homeTransporter")
          else
          navigate('/homemanufacturer')
      })
      .catch((error) => {
        console.log("request mai error aara hai")
        console.log(error)

      })
  }

  function handlePass(event) {
    event.preventDefault()
    // resetPassword(loginData)
    //   .then(res => {
    //     console.log(res.data)
    //     setResetOpt(res.data.success)
    //   })
    //   .catch(error => console.log(error))
  }


  const [isActive, setIsActive] = useState(true);

  const toggleButton = () => {
    setIsActive(!isActive);

  };


  return (
    <div className='p-5'>
      {/* <Navbar /> */}
      {!resetOpt && <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-sm">

          <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
            Sign in to your account
          </h2>
        </div>

        <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
          <form className="space-y-6" action="#" method="POST">

            {/* loging switch */}
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

            <div>
              <label htmlFor="email" className="block text-sm font-medium leading-6 text-gray-900">
                Email address
              </label>
              <div className="mt-2">
                <input
                  id="email"
                  name="email"
                  type="email"
                  onChange={handleChange}

                  autoComplete="email"
                  required
                  className="block w-full rounded-md border-0 p-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between">
                <label htmlFor="password" className="block text-sm font-medium leading-6 text-gray-900">
                  Password
                </label>
                <div className="text-sm">
                  <p className="font-semibold text-indigo-600 hover:text-indigo-500 cursor-pointer" onClick={handlePass}>
                    Forgot password?
                  </p>
                </div>
              </div>
              <div className="mt-2">
                <input
                  id="password"
                  name="password"
                  type="password"
                  onChange={handleChange}

                  autoComplete="current-password"
                  required
                  className="block w-full rounded-md border-0 p-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>

            <div>

              <button
                onClick={handle}
                className="flex w-full justify-center rounded-md bg-green-500 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
              >
                Sign in
              </button>
        
              
            </div>
          </form>

          <p className="mt-10 text-center text-sm text-gray-300">
            Not a member?{' '}
            <Link to={"/signup"} className="font-semibold leading-6 text-indigo-600 hover:text-indigo-500">
              Sign up
            </Link>
          </p>

        </div>
      </div>}


      {resetOpt && <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-sm">

          <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
            Verify your account
          </h2>
        </div>

        <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
          <div>
            <div>
              <label htmlFor="email" className="block text-sm font-medium leading-6 text-gray-900">
                Enter otp
              </label>
              <div className="mt-2">
                <input
                  name="otp"
                  type="text"
                  onChange={handleChangePass}
                  placeholder='enter otp'
                  required
                  className="block w-full rounded-md border-0 p-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
       
              </div>
            </div>

            <div>
              <label htmlFor="email" className="block text-sm font-medium leading-6 text-gray-900">
                Enter New password
              </label>
              <div className="mt-2">
                <input
                  name="newPassword"
                  type="password"
                  onChange={handleChangePass}
                  required
                  className="block w-full rounded-md border-0 p-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>

            <div>
              <label htmlFor="email" className="block text-sm font-medium leading-6 text-gray-900">
                Enter confirm password
              </label>
              <div className="mt-2">
                <input
                  name="confNewPassword"
                  type="password"
                  onChange={handleChangePass}
                  required
                  className="block w-full rounded-md border-0 p-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>

            <div className="mt-2">
              <button
                onClick={handleNewPassword}
                className="flex w-full justify-center rounded-md bg-green-500 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
              >
                Reset Password
              </button>
            </div>
          </div>

        </div>

      </div>}

    </div>
  )
}

