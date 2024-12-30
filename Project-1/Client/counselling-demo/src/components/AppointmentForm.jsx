import React, { useEffect, useState } from 'react';
import { createAppointment } from '../services/api';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthProvider';
import { message } from 'antd';
import counselor1 from '../assets/images/counselor1.jpg';
import counsel2 from '../assets/images/counsel2.jpg';
import counsel3 from '../assets/images/counsel3.jpg';
import { Link } from 'react-router-dom';
import { FaCopy } from 'react-icons/fa6';


const AppointmentForm = () => {
  const [counselor, setCounselor] = useState('');
  const [time, setTime] = useState('');
  const [type, setType] = useState('');
  const [messages, setMessages] = useState('');
  const [clientName, setClientName] = useState(''); 
  const [email, setEmail] = useState('');
  const [counselorId, setCounselorId] = useState('');
  const navigate = useNavigate();
  const { payment, setPayment, amount, setAmount } = useAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if(payment === 0){
      alert('Please Select Counselor and pay the fee first');
      navigate('/payment');
      return;
    }

    const appointmentData = { counselor, time, type, clientName, email, counselorId };

    try {
      const res = await createAppointment(appointmentData);
      message.success('Appointment scheduled successfully!');
      setMessages('Appointment scheduled successfully!');
      navigate('/dashboard');
      return res.data;
    } catch (err) {
      setMessages('Error scheduling appointment.');
    }
  };
  const handlePay = async()=>{
    if(counselor === 'Counselor1'){
      setAmount(10000);
    }
    else if(counselor === 'Counselor2'){
      setAmount(15000);
    }
    else if(counselor === 'Counselor3'){
      setAmount(20000);
    }
    try{

     navigate('/payment');
    }catch(err){
      console.log(err);
    }
  }
  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      message.error('Please login to schedule an appointment.');
      navigate('/login');
      return;
    }
    if(type === 'Mental Health'){
      setCounselor('Counselor1');
    }
    else if(type === 'Relationship'){
      setCounselor('Counselor2');
    }
    else if(type === 'Career'){
      setCounselor('Counselor3');
    }
    
  }, [navigate, type]);


  return (
    <div className="p-6 md:mb-20 md:mt-20 ">
      <h2 className="text-3xl font-title font-bold text-center mb-5">Book an Appointment</h2>
      <p className='text-center font-semibold mb-5 '>*Please Select the Counselor and Pay first</p>
      <div className='md:flex justify-center items-center'>
      <form onSubmit={handleSubmit}>
        <div className='grid grid-cols-1 md:grid-cols-3 gap-4'>
        <input
          type="text"
          value={clientName}
          onChange={(e) => setClientName(e.target.value)}
          placeholder=" Name"
          className="w-full p-2 mb-4 border"
        />
        <input
          type="text"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder=" Your Registered Email"
          className="w-full p-2 mb-4 border"
        />
        <input
          type="text"
          value={counselorId}
          onChange={(e) => setCounselorId(e.target.value)}
          placeholder="Counselor ID"
          className="w-full p-2 mb-4 border"
        />
         
        <input
          type="datetime-local"
          value={time}
          onChange={(e) => setTime(e.target.value)}
          className="w-full p-2 mb-4 border"
        />
        <select
          value={type}
          onChange={(e) => setType(e.target.value)}
          className="w-full p-2 mb-4 border"
        >
          <option value="">Select Counseling Type</option>
          <option value="Mental Health">Mental Health</option>
          <option value="Relationship">Relationship</option>
          <option value="Career">Career</option>
        </select>
        <input type="text" value={counselor} disabled className="w-full p-2 mb-4 border bg-white" />
        </div>
        <div className='flex justify-center items-center gap-4 mt-5'>
        <button onClick={handlePay} className=' px-6 py-2 bg-blue-500 text-white rounded-lg'> PAY </button>
        <button type="submit" className=" px-4 py-2 bg-blue-500 text-white rounded-lg ">Submit</button>
        </div>
      </form>
      </div>
      {messages && <p className="mt-4">{messages}</p>}
      <h1 className='text-3xl text-center font-bold mt-10'>Available Counselor's </h1>
      <div className='grid grid-cols-1 md:grid-cols-3 gap-5 md:px-5 md:ml-10 mt-10' >
        <div className='bg-white flex flex-col justify-center items-center py-10 shadow-lg '>
        <img src={counselor1} alt="" className='h-60 w-60 object-cover rounded-lg' />
        <p className='mt-3 text-2xl font-bold '>Counselor 1</p>
        <div className='px-10'>
        <FaCopy />
        <p className='mt-3  font-semibold  '>ID : 677029282b582764890516f1</p>
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
        <FaCopy />
        <p className='mt-3  font-semibold  '>ID : 6770e43a48f9d0f361caf3e4</p>
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
        <FaCopy />
        <p className='mt-3  font-semibold  '>ID : 677277d0d1a23011a1ab9faf</p>
        <p><span className='font-semibold text-lg'>Expertise :</span> Career</p>
        <p><span className='font-semibold text-lg '>speak :</span> English,Hindi,Tamil</p>
        <p><span className='font-semibold text-lg text-left' >Session Mode :</span> Video call, Chat, Voice call</p>
        </div>
        <button className='bg-green-700 mt-4 px-4 rounded-lg py-2 text-white font-semiold'><Link to='/form'>Book Appointment</Link></button>
        </div>
        </div>
    </div>
  );
};

export default AppointmentForm;
