import React from 'react'
import { assets } from '../assets/assets'

const Message = ({message}) => {
  return (
    <div>
      {message.role === 'user' ? (
        <div className='flex items-start justify-end my-4 gap-2'>
          <div className='flex flex-col gap-2 p-2 px-4 bg-slate-50
          dark:bg-[#57317C]/30 border border-[#80609F]/30 rounded-md max-w-2xl'>
            <p className=''>{message.content}</p>
            <span>{message.timestamp}</span>
          </div>
          <img src={assets.user_icon} className='w-8 rounded-full'/>
        </div>
      ) : (
        <div className=''>

        </div>
      )} 
    </div>
  )
}

export default Message