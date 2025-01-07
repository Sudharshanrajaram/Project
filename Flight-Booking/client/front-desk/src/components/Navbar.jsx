import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { FaBars, FaTimes, FaSignInAlt, FaHouseUser, FaUserPlus, FaPlaneDeparture, FaTicketAlt, FaHistory, FaSearch, FaFileAlt, FaUserAlt, FaPowerOff } from 'react-icons/fa';
import logo1 from '../assets/images/logo1.png';


const Navbar = () => {
  const location = useLocation();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [user, setUser] = useState('');

  const isActive = (path) => location.pathname === path;

  const toggleMobileMenu = () => setIsMobileMenuOpen(!isMobileMenuOpen);

  const toggleDropdown = () => setIsDropdownOpen(!isDropdownOpen);

  const handleLogout = () => {
    localStorage.removeItem('User');
    localStorage.removeItem('userId');
    localStorage.removeItem('token');
    setUser('');
    window.location.reload(); // To force the state reset on logout
  };

  // Sync user state with localStorage on initial load
  useEffect(() => {
    const storedUser = localStorage.getItem('User');
    if (storedUser) {
      setUser(storedUser);
    }
  }, []); // Empty dependency array ensures this runs only on the first render

  // This function can be called after a successful login to update the state
  

  return (
    <nav className="bg-gradient-to-r from-blue-600 to-indigo-700 text-white p-4 shadow-lg">
      <div className="flex justify-between items-center">
        {/* Branding */}
        <div className='flex items-center space-x-3 md:ml-3'>
        <FaPlaneDeparture size={30} className="text-white" />
        <Link to="/" className="text-3xl font-extrabold text-indigo-500 rounded-lg   bg-white px-5 py-1 hover:text-yellow-300 transition duration-300">
          <em>REN AIRLINE</em>
        </Link>
        </div>
        {/* Navigation Links for Desktop */}
        <div className="space-x-6 hidden sm:flex">
          {user ? (
            <>
              {/* User Dropdown */}
              <div className="relative">
                <button onClick={toggleDropdown} className="flex items-center space-x-2 text-lg text-white hover:text-yellow-300 transition duration-300 py-2 px-4 rounded-md">
                  <FaUserAlt />
                  <span>{user}</span>
                </button>
                {isDropdownOpen && (
                  <div className="absolute z-10 right-0 mt-2 bg-indigo-800 rounded-lg shadow-lg w-40">
                    <button
                      onClick={handleLogout}
                      className="block text-lg py-2 px-4 text-white hover:bg-yellow-300 hover:text-black w-full text-left"
                    >
                      <FaPowerOff className="mr-2" />
                      Logout
                    </button>
                    <Link to='/' className="block text-lg py-2 px-4 text-white hover:bg-yellow-300 hover:text-black w-full text-left">
                    <FaHouseUser className="mr-2" />
                    Home</Link>
                  </div>
                )}
              </div>
            </>
          ) : (
            <>
              <Link
                to="/login"
                className={`text-lg flex items-center ${isActive('/login') ? 'text-yellow-300' : 'text-white'} hover:text-white transition duration-300 py-2 px-4 rounded-md hover:bg-yellow-300 hover:text-white`}
              >
                <FaSignInAlt className="mr-2" />
                Login
              </Link>
              <Link
                to="/register"
                className={`text-lg flex items-center ${isActive('/register') ? 'text-yellow-300' : 'text-white'} hover:text-white transition duration-300 py-2 px-4 rounded-md hover:bg-yellow-300 hover:text-white`}
              >
                <FaUserPlus className="mr-2" />
                Register
              </Link>
            </>
          )}

          <Link
            to="/booking"
            className={`text-lg flex items-center ${isActive('/booking') ? 'text-yellow-300' : 'text-white'} hover:text-white transition duration-300 py-2 px-4 rounded-md hover:bg-yellow-300 hover:text-white`}
          >
            <FaTicketAlt className="mr-2" />
            Booking
          </Link>
          <Link
            to="/getBooking"
            className={`text-lg flex items-center ${isActive('/getBooking') ? 'text-yellow-300' : 'text-white'} hover:text-white transition duration-300 py-2 px-4 rounded-md hover:bg-yellow-300 hover:text-white`}
          >
            <FaHistory className="mr-2" />
            History
          </Link>
          <Link
            to="/flightSearch"
            className={`text-lg flex items-center ${isActive('/flightSearch') ? 'text-yellow-300' : 'text-white'} hover:text-white transition duration-300 py-2 px-4 rounded-md hover:bg-yellow-300 hover:text-white`}
          >
            <FaSearch className="mr-2" />
            Search
          </Link>
          <Link
            to="/report"
            className={`text-lg flex items-center ${isActive('/report') ? 'text-yellow-300' : 'text-white'} hover:text-white transition duration-300 py-2 px-4 rounded-md hover:bg-yellow-300 hover:text-white`}
          >
            <FaFileAlt className="mr-2" />
            Reports
          </Link>
        </div>

        {/* Mobile Navbar Toggle */}
        <div className="sm:hidden flex items-center">
          <button onClick={toggleMobileMenu} className="text-3xl">
            {isMobileMenuOpen ? <FaTimes /> : <FaBars />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <div className={`sm:hidden ${isMobileMenuOpen ? 'block' : 'hidden'} mt-4 bg-indigo-800 p-4 rounded-lg shadow-lg transition-all`}>
        {user ? (
          <div>
            <button onClick={handleLogout} className="block text-lg py-2 px-4 text-white hover:bg-yellow-300 hover:text-black w-full text-left">
              <FaPowerOff className="mr-2" />
              Logout
            </button>
          </div>
        ) : (
          <>
            <Link
              to="/login"
              className={`block text-lg py-2 px-4 ${isActive('/login') ? 'text-yellow-300' : 'text-white'} hover:text-yellow-300 transition duration-200 flex items-center`}
              onClick={() => setIsMobileMenuOpen(false)}
            >
              <FaSignInAlt className="mr-2" />
              Login
            </Link>
            <Link
              to="/register"
              className={`block text-lg py-2 px-4 ${isActive('/register') ? 'text-yellow-300' : 'text-white'} hover:text-yellow-300 transition duration-200 flex items-center`}
              onClick={() => setIsMobileMenuOpen(false)}
            >
              <FaUserPlus className="mr-2" />
              Register
            </Link>
          </>
        )}
        <Link
          to="/"
          className={`block text-lg py-2 px-4 ${isActive('/') ? 'text-yellow-300' : 'text-white'} hover:text-yellow-300 transition duration-200 flex items-center`}
          onClick={() => setIsMobileMenuOpen(false)}
        >
          <FaHouseUser className="mr-2" />
          Home
        </Link>
        <Link
          to="/booking"
          className={`block text-lg py-2 px-4 ${isActive('/booking') ? 'text-yellow-300' : 'text-white'} hover:text-yellow-300 transition duration-200 flex items-center`}
          onClick={() => setIsMobileMenuOpen(false)}
        >
          <FaTicketAlt className="mr-2" />
          Booking
        </Link>
        <Link
          to="/getBooking"
          className={`block text-lg py-2 px-4 ${isActive('/getBooking') ? 'text-yellow-300' : 'text-white'} hover:text-yellow-300 transition duration-200 flex items-center`}
          onClick={() => setIsMobileMenuOpen(false)}
        >
          <FaHistory className="mr-2" />
          History
        </Link>
        <Link
          to="/flightSearch"
          className={`block text-lg py-2 px-4 ${isActive('/flightSearch') ? 'text-yellow-300' : 'text-white'} hover:text-yellow-300 transition duration-200 flex items-center`}
          onClick={() => setIsMobileMenuOpen(false)}
        >
          <FaSearch className="mr-2" />
          Search
        </Link>
        <Link
          to="/report"
          className={`block text-lg py-2 px-4 ${isActive('/report') ? 'text-yellow-300' : 'text-white'} hover:text-yellow-300 transition duration-200 flex items-center`}
          onClick={() => setIsMobileMenuOpen(false)}
        >
          <FaFileAlt className="mr-2" />
          Reports
        </Link>
      </div>
    </nav>
  );
};

export default Navbar;
