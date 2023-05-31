import React from 'react'
import { useEffect } from 'react'
import { useRef } from 'react'
import { useState } from 'react'
import { useSelector } from 'react-redux'

function CommentList({id}) {
    const { postData, loading,isLiked,enableDetail} = useSelector(state => state.postState)
    const [com,setCom]=useState([])
const commentRef=useRef(null)

  useEffect(()=>{
   const dat=  postData.find(it=>it._id==id)
    setCom(dat.comments)
  }

  ,[postData])

  useEffect(() => {
    scrollToBottom();
  }, [com]);

  const scrollToBottom = () => {
    if (commentRef.current) {
      commentRef.current.scrollTop = commentRef.current.scrollHeight;
    }
  };

  return (
    <div>
        <ul ref={commentRef} className='h-[150px] overflow-auto'>
       {com?.map((itm,ind)=>{return (
        <>
     <li key={ind}><strong className=''>{itm.split(':-')[0]} </strong> {itm.split(':-')[1]}</li>
        </>
    )})}
     
    
    </ul>
    </div>
  )
}

export default CommentList