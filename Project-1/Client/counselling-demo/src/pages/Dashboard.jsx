// src/pages/Dashboard.jsx
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { message } from 'antd';
import logo1 from '../assets/images/logo1.jpg';
import logo2 from '../assets/images/logo2.png';
import dash3 from '../assets/images/dash3.jpg';
import dash2 from '../assets/images/dash2.avif';
import counselor1 from '../assets/images/counselor1.jpg';
import counsel2 from '../assets/images/counsel2.jpg';
import counsel3 from '../assets/images/counsel3.jpg';
import counselor4 from '../assets/images/counsel4.jpg';
import counselor5 from '../assets/images/counsel5.jpg';

const Dashboard = () => {
  const [appointments, setAppointments] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const getUser = async () => {
    try{
      const res = await axios.get('https://project-rniz.onrender.com/api/auth/profile', {
        headers: {
          Authorization: localStorage.getItem('token')
        }
      });
      message.success('User fetched successfully');
      localStorage.setItem('userId', res.data.user._id);
    }catch(err){
      message.error('Failed to fetch user please login again');
      setError('Failed to fetch user please login again');
      console.log(err);
    }
    try {
      const id = localStorage.getItem('userId');
      const response = await axios.get(`https://project-rniz.onrender.com/api/appointments/${id}`, {
        headers: {
          Authorization: localStorage.getItem('token')
        }
      });
      message.success('Appointments fetched successfully');
      console.log(response.data);
      setAppointments(response.data);
      
      
    } catch (err) {
      message.error('Failed to fetch appointments');
      setError('Failed to fetch appointments');
    }
  };
  
  
  
  useEffect(() => {
    
      const token = localStorage.getItem('token');
      if (!token) {
        message.error('Please login to access the dashboard');
        navigate('/login');
        return;
      }
    getUser();
  }, [navigate]);

  return (
    <div className='relative '>
      <img src={dash2} alt="images" className=' h-60 w-full md:h-screen md:w-full' />
      <div className='flex '>
        <div className='absolute  top-20 md:mt-10 md:ml-5 flex justify-between px-10 items-center'>
          <div className='md:h-44 md:top-0 md:w-96 md:bg-white md:absolute md:border md:blur-3xl md:rounded-full md:shadow-2xl'></div>
          <div className='md:w-1/2'>
            <h1  className='relative  text-green-600  md:leading-tight font-bold md:text-4xl'> <em>We Providing Counselling For Mental Health, Relationship And Other psychological Concerns.</em></h1>
              <div className=' mt-5'>
                <button onClick={()=>{
                 scrollTo({
                  top : 750,
                  behavior: 'smooth'
                 })
                 }} className='bg-[#E7E8D8] text-xs p-2 md:text-lg md:px-10 md:py-4 rounded-lg md:mt-10 '>Find Counselor</button>
                <button onClick={()=>{scrollTo({top : 1800,behavior: 'smooth'})}} className='bg-[#E7E8D8] text-xs p-2 md:text-lg md:px-14 md:py-4 rounded-lg md:mt-10 ml-5 md:ml-10'>Get Booking</button>
              </div>
            </div>
          <div>
          <img src={dash3} alt="images" className='h-20 w-60 md:h-72 md:w-full mr-10 rounded-full' />
        </div>
      </div>
    </div>
    <div  className='pb-10 relative px-10'>
      <h1  className=' text-2xl md:text-5xl text-center mt-10 font-bold'>Our Counselor's</h1>
      <div className='grid grid-cols-1 md:grid-cols-3 gap-5 md:px-5 md:ml-10 mt-10' >
        <div className='bg-white flex flex-col justify-center items-center py-10 shadow-lg '>
        <img src={counselor1} alt="" className='h-60 w-60 object-cover rounded-lg' />
        <p className='mt-3 text-2xl font-bold '>Counselor 1</p>
        <div className='px-10'>
        <p><span className='font-semibold text-lg'>Expertise :</span> Mental Health</p>
        <p><span className='font-semibold text-lg '>speak :</span> English,Hindi</p>
        <p><span className='font-semibold text-lg text-left' >Session Mode :</span> Video call, Chat, Voice call</p>
        </div>
        <button className='bg-green-700 mt-4 px-4 rounded-lg py-2 text-white font-semiold'><Link to='/form'>Book Appointment</Link></button>
        </div>
        <div className='bg-white flex flex-col justify-center items-center py-10 shadow-lg'>
        <img src={counsel2} alt="" className='h-60 w-60 object-cover rounded-lg' />
        <p className='mt-3 text-2xl font-bold '>Counselor 2</p>
        <div className='px-10'>
        <p><span className='font-semibold text-lg'>Expertise :</span> RelationShip</p>
        <p><span className='font-semibold text-lg '>speak :</span> English,Hindi</p>
        <p><span className='font-semibold text-lg text-left' >Session Mode :</span> Video call, Chat, Voice call</p>
        </div>
        <button className='bg-green-700 mt-4 px-4 rounded-lg py-2 text-white font-semiold'><Link to='/form'>Book Appointment</Link></button>
        </div>
        <div className='bg-white flex flex-col justify-center items-center py-10 shadow-lg'>
        <img src={counsel3} alt="" className='h-60 w-60 object-cover rounded-lg' />
        <p className='mt-3 text-2xl font-bold '>Counselor 3</p>
        <div className='px-10'>
        <p><span className='font-semibold text-lg'>Expertise :</span> Career</p>
        <p><span className='font-semibold text-lg '>speak :</span> English,Hindi,Tamil</p>
        <p><span className='font-semibold text-lg text-left' >Session Mode :</span> Video call, Chat, Voice call</p>
        </div>
        <button className='bg-green-700 mt-4 px-4 rounded-lg py-2 text-white font-semiold'><Link to='/form'>Book Appointment</Link></button>
        </div>
        <div className='bg-white flex flex-col justify-center items-center py-10 opacity-50 shadow-lg'>
        <img src={counselor4} alt="" className='h-60 w-60 object-cover rounded-lg' />
        <p className='mt-3 text-2xl font-bold '>Counselor 4</p>
        <div className='px-10'>
        <p><span className='font-semibold text-lg'>Expertise :</span> Anexity</p>
        <p><span className='font-semibold text-lg '>speak :</span> English,Hindi</p>
        <p><span className='font-semibold text-lg text-left' >Session Mode :</span> Video call, Chat, Voice call</p>
        </div>
        <button className='bg-green-700 mt-4 px-4 rounded-lg py-2 text-white font-semiold'>No Availability</button>
        </div>
        <div className='bg-white flex flex-col justify-center items-center py-10 opacity-50 shadow-lg'>
        <img src={counselor5} alt="" className='h-60 w-60 object-cover rounded-lg' />
        <p className='mt-3 text-2xl font-bold '>Counselor 5</p>
        <div className='px-10'>
        <p><span className='font-semibold text-lg'>Expertise :</span>Depression</p>
        <p><span className='font-semibold text-lg '>speak :</span> English,Hindi</p>
        <p><span className='font-semibold text-lg text-left' >Session Mode :</span> Video call, Chat, Voice call</p>
        </div>
        <button className='bg-green-700 mt-4 px-4 rounded-lg py-2 text-white font-semiold'>No Availability</button>
        </div>
      </div>
      <div className="mt-10 bg-[#D9EAFD] px-10">
      <div className="p-6  mx-auto bg-[#D9EAFD] rounded ">
        <h2 className="text-3xl font-bold mb-4 text-center">Your Bookings</h2>
        {error && <div className='text-red-500 mb-4'>{error}</div>}
          <div className='grid grid-cols-1 md:grid-cols-3 gap-4'>
            {appointments.length > 0 ? appointments.map((appointment) => (
              <div key={appointment._id} className='mb-4 p-4 border rounded bg-white shadow-lg'>
                <p className='text-green-500 font-bold'>Assigned Counselor: {appointment.counselor}</p>
                <p>Appointment ID: {appointment._id}</p>
                <p>Client Name: {appointment.clientName}</p>
                <p>Time: {appointment.time}</p>
                <p>Requested Type: {appointment.type}</p>
                <p>Status: {appointment.status}</p>
              </div>
            )) : <p>No appointments scheduled.</p>}
          </div>
      </div>
    </div>
    </div>
     <footer class="bg-gradient-to-t from-[#A542C8] to-[#E7E8D8] ">
            <div class=" md:flex justify-between items-center md:px-20 p-6 ">
                <div className='flex '>
                <img src={logo1} alt="logo" className='h-10 w-10 md:h-14 md:w-14 rounded-full mt-2 mr-2' />
                  <img src={logo2} alt="logo" className='h-14 w-40 md:h-20 md:w-60' />
                </div>
                <div className='flex flex-col md:flex-row md:space-x-10'>
                  <ul className='text-white md:text-lg mt-4'>
                  <h1 className='text-white md:text-2xl font-bold'>Quick Links</h1>
                    <li>Home</li>
                    <li>About</li>
                    <li>Contact</li>
                    <li>Privacy Policy</li>
                  <li>Terms & Conditions</li>
                  </ul>
                  <ul className='text-white md:text-lg mt-4'>
                  <h1 className='text-white md:text-2xl font-bold'>Services</h1>
                    <li>FAQ</li>
                    <li>Blog</li>
                    <li>Help</li>
                    <li>Support</li>
                    <li>Careers</li>
                  </ul>
                  <ul className='text-white md:text-lg mt-4'>
                    <h1 className='text-white md:text-2xl font-bold'>Contact Us</h1>
                    <li>+91 9876543210</li>
                    <li>askmeidentity@gmail.com</li>
                    <li>India</li>
                    <li>1234567890</li>
                    <li>askmeidentity@gmail.com</li>
    
                  </ul>
                </div>
            </div>
            <div className='' >
                <p class="text-white text-center text-lg">Copyright @ 2023 askmeidentity. All Rights Reserved</p>
            </div>
        </footer>
  </div>
    
  );
};

export default Dashboard;
