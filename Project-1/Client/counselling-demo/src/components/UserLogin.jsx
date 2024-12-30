import { message } from 'antd';
import React, { useState } from 'react'
import { Link } from 'react-router-dom';

const UserLogin = ({setUser}) => {
    const [userName, setUserName] = useState()
    const handleUser = () => {
        if(!userName) return;
        message.success('User Created Successfully')
        setUser(userName)
        localStorage.setItem('chatUser', userName)
        
    }
  return (
    <div className='h-screen flex  justify-center items-start md:mt-10'>
        <div className=''>
            <h1 className='text-center text-4xl mb-10'>Chat</h1>
            <input type="text" placeholder='Enter a Unique Name'
            className='w-full p-2 border border-gray-300 rounded-md mb-4'
            onChange={(e) => setUserName(e.target.value)}/>
            <div className='flex justify-center'>
            <button className='bg-[#FF9D3D] px-6 rounded-lg py-2 text-white' onClick={handleUser}>Enter</button>
            <button  className='bg-[#FF9D3D] px-6 rounded-lg py-2 text-white ml-3'><Link to='/dashboard'>Home</Link></button>
            </div>
        </div>
    </div>
  )
}

export default UserLogin