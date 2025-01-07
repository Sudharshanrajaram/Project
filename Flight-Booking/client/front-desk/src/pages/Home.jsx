import React, { useState } from 'react';
import { searchFlights } from '../services/api';
import home1 from '../assets/images/home1.png';
import flight1 from '../assets/images/flight1.png';
import foot1 from '../assets/images/foot1.jpg';
import { FaPlane } from 'react-icons/fa';
import { Link } from 'react-router-dom';

const Home = () => {
    const [flights, setFlights] = useState([]);

    const handleSearch = async (criteria) => {
        const foundFlights = await searchFlights(criteria);
        setFlights(foundFlights);
    };

    return (
        <div className="bg-gradient-to-r from-blue-500 to-teal-400 ">
            {/* Hero Section */}
            <div className="relative">
                <img src={home1} alt="home" className="w-full h-auto object-cover" />
                <div className="absolute top-6 md:top-32 ml-10 font-righteous  ">
                    <em className="text-sm md:text-5xl lg:text-5xl text-gray-300 leading-tight">
                        We Provide You The <br /> World's Best Flight Deals <br /> Safe & Secure
                    </em>
                    <div className="md:mt-6  ">
                        <button className="bg-gray-300 text-xs p-1 md:text-xl md:py-2 md:px-6 rounded-lg hover:bg-gray-400 transition-all">
                           <Link to='/flightSearch'> Find Flights</Link>
                        </button>
                        <button 
                        onClick={()=>{
                            scrollTo({
                             top : 850,
                             behavior: 'smooth'
                            })
                        }}
                        className="bg-gray-300 ml-3 text-xs p-1 md:text-xl md:py-2 md:px-6 rounded-lg mt-4 sm:mt-0 sm:ml-4 hover:bg-gray-400 transition-all">
                            Get Started
                        </button>
                    </div>
                </div>
            </div>

            {/* Steps to Book Flight Section */}
            <div className="mt-10 px-6 md:px-10">
                <div className="bg-indigo-700 rounded-lg pt-20 pb-20 p-4">
                    <div className="flex justify-center gap-4">
                        <h1 className="md:text-4xl text-white">Book Your Flight's with</h1>
                        <span className="bg-blue-600 px-6 py-3 font-righteous text-white text-2xl md:text-5xl sm:text-6xl">
                            RenAirline.in
                        </span>
                    </div>
                    <div className="mt-10 text-center">
                        <h2 className="md:text-2xl text-gray-300 mb-8">Booking your flight with us is easy and secure. Just follow these steps:</h2>
                        <div className="flex flex-wrap justify-center gap-6">
                            <div className="flex items-center space-x-2">
                                <button className="bg-gray-300 px-4 py-2 md:text-xl rounded-lg hover:bg-gray-400 transition-all">
                                    Search Flight
                                </button>
                                <FaPlane className="text-gray-300 text-3xl" />
                            </div>
                            <div className="flex items-center gap-2">
                                <button className="bg-gray-300 px-4 py-2 md:text-xl rounded-lg hover:bg-gray-400 transition-all">
                                    Select Flight
                                </button>
                                <FaPlane className="hidden sm:block text-gray-300 md:text-3xl" />
                            </div>
                            <div className="flex items-center gap-2">
                                <button className="bg-gray-300 px-4 py-2 md:text-xl rounded-lg hover:bg-gray-400 transition-all">
                                    Book Flight
                                </button>
                                <FaPlane className="text-gray-300 text-3xl" />
                            </div>
                            <div className="flex items-center gap-2">
                                <button className="bg-gray-300 px-4 py-2 md:text-xl rounded-lg hover:bg-gray-400 transition-all">
                                    Enjoy Flight
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Offer Section */}
            <div className="mt-10 px-6 md:px-10">
                <div className="bg-indigo-700 rounded-lg pt-20 pb-5 p-4">
                    <div className="flex justify-center gap-4">
                        <span className="bg-blue-600 px-6 py-3 font-righteous text-white md:text-5xl">
                            RenAirline.in
                        </span>
                        <h1 className="md:text-4xl text-gray-300 pt-5">Get Off with 15%</h1>
                    </div>
                    <div className="mt-10 pb-5">
                        <div className="flex justify-center gap-6">
                            <div className="flex items-center gap-1">
                                <h1 className="text-6xl sm:text-7xl text-gray-300 font-righteous">25%</h1>
                                <p className="text-2xl text-gray-300">Off</p>
                            </div>
                            <div className="flex items-center">
                                <p className="bg-blue-600 text-gray-300 font-righteous px-6 py-2 md:text-3xl sm:text-4xl">Limited Offer</p>
                            </div>
                        </div>
                        <div className="flex justify-center gap-5 mt-6">
                            <button className="bg-gray-300 md:h-14 md:mt-10 md:text-2xl px-6 py-3 rounded-lg font-righteous hover:bg-gray-400 transition-all">
                               <Link to='/flightSearch'> Book Now </Link>
                            </button>
                            <img src={flight1} alt="flight" className="w-32 md:w-auto object-contain" />
                        </div>
                    </div>
                </div>
            </div>
            <footer className='bg-gradient-to-r from-blue-500 to-teal-400 mt-10' >
                        <div class=" md:flex justify-between items-center md:px-20 p-6 ">
                            <div className=''>
                            <img src={foot1} alt="logo" className='h-20 w-28 md:h-28 md:w-52 rounded-full mt-2 mr-2' />
                             <h1 className='md:text-7xl text-2xl  text-gray-300 font-righteous  md:text-center'><em>Airline</em></h1>
                            </div>
                            <div className='flex flex-col md:flex-row md:space-x-10'>
                              <ul className='text-gray-300 md:text-lg mt-4'>
                              <h1 className='text-gray-300 md:text-2xl font-bold'>Quick Links</h1>
                                <li>Home</li>
                                <li>About</li>
                                <li>Contact</li>
                                <li>Privacy Policy</li>
                              <li>Terms & Conditions</li>
                              </ul>
                              <ul className='text-gray-300 md:text-lg mt-4'>
                              <h1 className='text-gray-300 md:text-2xl font-bold'>Services</h1>
                                <li>FAQ</li>
                                <li>Blog</li>
                                <li>Help</li>
                                <li>Support</li>
                                <li>Careers</li>
                              </ul>
                              <ul className='text-gray-300 md:text-lg mt-4'>
                                <h1 className='text-gray-300 md:text-2xl font-bold'>Contact Us</h1>
                                <li>+91 9876543210</li>
                                <li>askmeidentity@gmail.com</li>
                                <li>India</li>
                                <li>1234567890</li>
                                <li>askmeidentity@gmail.com</li>
                
                              </ul>
                            </div>
                        </div>
                        <div className='mt-10 pb-5' >
                            <p class="text-white text-center text-lg">Copyright @ 2023 askmeidentity. All Rights Reserved</p>
                        </div>
                    </footer>
        </div>
    );
};

export default Home;
