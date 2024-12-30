import { message } from 'antd';
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import logo1 from '../assets/images/logo1.jpg';
import logo2 from '../assets/images/logo2.png';
import { FaRightFromBracket, FaBars, FaCaretDown } from 'react-icons/fa6';


const Navbar = () => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isDropdownOpen2, setIsDropdownOpen2] = useState(false);
  
  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };
  const navigate = useNavigate();
  const logout = () => {
    message.success('Logout Successfully');
    localStorage.removeItem('userId');
    localStorage.removeItem('id');
    localStorage.removeItem('avatar');
    localStorage.removeItem('role');
    localStorage.removeItem('chatUser');
    localStorage.removeItem('token');
    localStorage.setItem('');
    navigate('/login');
    window.location.reload();
  };
  const showItems = () => {
    setIsDropdownOpen2(!isDropdownOpen2);
  }
  return (
    <nav className="bg-[#E7E8D8] p-4  h-22">
      <div className="flex justify-between">
        <div className='flex gap-2 md:ml-6'>
        <img src={logo1} alt="logo" className='h-10 w-14 md:h-14 md:w-20 rounded-full' />
        <img src={logo2} alt="logo" className='h-10 w-40 md:h-14 mt-1 md:w-60 rounded-full' />
        </div>
        
        <div className="space-x-5 relative md:mr-10">
          
            <button
              onClick={showItems}
              className=" focus:outline-none text-lg">
              <FaBars className='md:hidden text-3xl text-black mt-2 mr-5'  />
            </button>
            {isDropdownOpen2 && (
              <div className="absolute right-0 p-4 z-10 border-2 border-black text-lg bg-[#E7E8D8] text-black shadow-lg rounded-lg w-44">
                <button onClick={()=> setIsDropdownOpen2(false)} className="block mb-2 mx-2"><Link to='/notes'>NOTES</Link></button>
          <button onClick={()=> setIsDropdownOpen2(false)} className="block mx-2 mb-2"><Link to='/dashboard'>HOME</Link></button>
          <button onClick={()=> setIsDropdownOpen2(false)} className=" block mx-2 mb-2"><Link to='/Cbooking'>DASHBOARD</Link></button>
          <button onClick={()=> setIsDropdownOpen2(false)} className="block mx-2"><Link to='/video-call'>MEETINGS</Link></button>
          <button onClick={()=> setIsDropdownOpen2(false)} className="mx-2 block"> <Link to='/login'>LOGIN</Link></button>
          <button onClick={()=> setIsDropdownOpen2(false)} className="mx-2 block"><Link to='/register'>REGISTER</Link></button>
          <button onClick={()=> setIsDropdownOpen(false)} className="block mx-2"><Link to='/chat'>CHATS</Link></button>
          <button  className="mx-2 block" onClick={logout}><FaRightFromBracket /></button>
              </div>
            )}
            </div>
        <div className='hidden md:flex md:mt-4 md:gap-10 md:mr-10  md:font-title md:text-lg font-semibold'>
          <div className="space-x-10 relative md:mr-10">
          
            <button
              onClick={toggleDropdown}
              className=" focus:outline-none text-lg">
              SERVICES<FaCaretDown />
            </button>
            {isDropdownOpen && (
              <div className="absolute  p-4 z-10 text-lg bg-[#E7E8D8] border-2 border-black text-black shadow-lg rounded-lg w-44">
                <button onClick={()=> setIsDropdownOpen(false)} className="block mb-2 mx-2"><Link to='/notes'>NOTES</Link></button>
          <button onClick={()=> setIsDropdownOpen(false)} className="block mx-2 mb-2"><Link to='/dashboard'>HOME</Link></button>
          <button onClick={()=> setIsDropdownOpen(false)} className=" block mx-2 mb-2"><Link to='/Cbooking'>DASHBOARD</Link></button>
          <button onClick={()=> setIsDropdownOpen(false)} className="block mx-2"><Link to='/chat'>CHATS</Link></button>
              </div>
            )}
            <button className="mx-2"><Link to='/form'>BOOKING</Link></button>
            </div>
          <div>
          <button className="mx-2"><Link to='/video-call'>MEETINGS</Link></button>
          <button className="mx-2"> <Link to='/login'>LOGIN</Link></button>
          <button className="mx-2"><Link to='/register'>REGISTER</Link></button>
          <button  className=" ml-3 " onClick={logout}><FaRightFromBracket className='' /></button>

          </div>

        </div>
      </div>
    </nav>
  );
};

export default Navbar;
