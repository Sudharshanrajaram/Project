import { message } from 'antd';
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import logo1 from '../assets/images/logo1.jpg';
import logo2 from '../assets/images/logo2.png';
import { FaRightFromBracket, FaBars, FaCaretDown } from 'react-icons/fa6';

const Navbar = () => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isDropdownOpen2, setIsDropdownOpen2] = useState(false);

  const navigate = useNavigate();

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  const logout = () => {
    message.success('Logout Successfully');
    localStorage.clear();
    navigate('/login');
    window.location.reload();
  };

  return (
    <nav className="bg-[#E7E8D8] text-white p-4">
      <div className="flex justify-between items-center">
        {/* Logo Section */}
        <div className="flex items-center gap-3">
          <img src={logo1} alt="Logo" className="h-12 w-14 rounded-full" />
          <img src={logo2} alt="Logo" className="h-12 w-48 ml-5 mt-1 rounded-full" />
        </div>

        {/* Desktop Menu */}
        <div className="hidden md:flex items-center space-x-8 font-medium text-black">
          <div className="relative group text-black">
            <button
              className="flex items-center gap-2 hover:text-yellow-400 transition duration-300"
              onClick={toggleDropdown}
            >
              SERVICES <FaCaretDown className={`transition-transform duration-300 ${isDropdownOpen ? "rotate-180" : ""}`} />
            </button>
            {isDropdownOpen && (
              <div className="absolute left-0 z-10 mt-2 w-44 bg-white text-black shadow-lg rounded-md overflow-hidden border border-gray-200">
                <Link
                  to="/notes"
                  className="block px-4 py-2 hover:bg-gray-200"
                  onClick={() => setIsDropdownOpen(false)}
                >
                  Notes
                </Link>
                <Link
                  to="/dashboard"
                  className="block px-4 py-2 hover:bg-gray-200"
                  onClick={() => setIsDropdownOpen(false)}
                >
                  Home
                </Link>
                <Link
                  to="/Cbooking"
                  className="block px-4 py-2 hover:bg-gray-200"
                  onClick={() => setIsDropdownOpen(false)}
                >
                  Dashboard
                </Link>
                <Link
                  to="/chat"
                  className="block px-4 py-2 hover:bg-gray-200"
                  onClick={() => setIsDropdownOpen(false)}
                >
                  Chats
                </Link>
              </div>
            )}
          </div>

          <Link to="/form" className="hover:text-yellow-400 transition duration-300">
            BOOKING
          </Link>
          <Link to="/video-call" className="hover:text-yellow-400 transition duration-300">
            MEETINGS
          </Link>
          <Link to="/login" className="hover:text-yellow-400 transition duration-300">
            LOGIN
          </Link>
          <Link to="/register" className="hover:text-yellow-400 transition duration-300">
            REGISTER
          </Link>
          <button onClick={logout} className="hover:text-red-500 transition duration-300">
            <FaRightFromBracket />
          </button>
        </div>

        {/* Mobile Menu */}
        <button className="md:hidden text-3xl" onClick={() => setIsDropdownOpen2(!isDropdownOpen2)}>
          <FaBars />
        </button>
      </div>

      {/* Mobile Dropdown Menu */}
      {isDropdownOpen2 && (
        <div className="md:hidden mt-4 bg-white text-black shadow-lg rounded-md p-4 space-y-2 border border-gray-200">
          <Link to="/notes" className="block hover:text-yellow-400" onClick={() => setIsDropdownOpen2(false)}>
            Notes
          </Link>
          <Link to="/dashboard" className="block hover:text-yellow-400" onClick={() => setIsDropdownOpen2(false)}>
            Home
          </Link>
          <Link to="/Cbooking" className="block hover:text-yellow-400" onClick={() => setIsDropdownOpen2(false)}>
            Dashboard
          </Link>
          <Link to="/video-call" className="block hover:text-yellow-400" onClick={() => setIsDropdownOpen2(false)}>
            Meetings
          </Link>
          <Link to="/login" className="block hover:text-yellow-400" onClick={() => setIsDropdownOpen2(false)}>
            Login
          </Link>
          <Link to="/register" className="block hover:text-yellow-400" onClick={() => setIsDropdownOpen2(false)}>
            Register
          </Link>
          <Link to="/chat" className="block hover:text-yellow-400" onClick={() => setIsDropdownOpen2(false)}>
            Chats
          </Link>
          <button onClick={logout} className="block hover:text-red-500">
            Logout <FaRightFromBracket className="inline ml-2" />
          </button>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
