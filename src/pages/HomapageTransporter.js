import React, { useEffect, useState } from 'react'
import PostForm from '../components/PostForm'
import { loginstate, setUser } from '../redux/slices/navbarSlice';
import jwtDecode from "jwt-decode"
import Navbar from '../components/Navbar'

import { useDispatch, useSelector } from 'react-redux';
import Pagination from '../components/Pagination';
import PostDetail from './PostDetail';
import { useNavigate } from 'react-router-dom';

function Homapage() {

  const dispatch = useDispatch();
 const navigate=useNavigate()
  const {showDetail} = useSelector(state => state.postDetailState)
  const {logedIn,userData,searchOpt}=useSelector((state)=>state.navbarState)
  const { postData, loading,isLiked,enableDetail,status} = useSelector(state => state.postState)


  useEffect(() => {
    if(localStorage.getItem('userData')){
    const token=JSON.parse(localStorage.getItem('userData')).token
    const decodedToken = jwtDecode(token);
    const expirationTime = decodedToken.exp * 1000; // Convert expiration time to milliseconds
    const currentTime = new Date().getTime()
    if(currentTime < expirationTime){
    dispatch(setUser(JSON.parse(localStorage.getItem('userData')).user))
    dispatch(loginstate(true))
    }
  }else{
    dispatch(setUser({}))
      localStorage.clear();
      alert('session expired login again')
      navigate('/')
  }

  }, [])

  return (
    <div className='w-full p-10 flex flex-col items-center sm:block'>
      <Navbar />
      {enableDetail &&  <div className=''><PostDetail showDetail={showDetail}/></div>}
        <div className='flex flex-col-reverse sm:flex-row sm:justify-between  mx-10'>
        <div className='sm:w-[80%]'>
          <Pagination itemsPerPage={6} />
        </div>
        <div className=''>
        {logedIn?(!enableDetail && <PostForm />): 
        <div>
          <p>login to create stories</p>
        </div>
        }
        </div>

      </div>

    </div>
  )
}

export default Homapage