// src/pages/Register.jsx
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { registerCounselor } from '../services/api';
import { Link } from 'react-router-dom';
import { message } from 'antd';
import register1 from '../assets/images/register1.jpg';

const CounselorRegister = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      const res = await registerCounselor(name, email, password);
      message.success('Registration successful');
      navigate('/Clogin');
      return res.data;
      
    } catch (err) {
      message.error('Registration failed'); 
      setError('Error during registration');
    }
  };

  return (
    <div className="flex justify-center items-center bg-[#D9EAFD] mb-10 mt-10 rounded-lg">
          <div className='md:flex border rounded-lg'>
            <img src={register1} alt="img" className='h-60 w-full md:h-96 md:w-3/4' />
          <div className="p-6 max-w-sm mx-auto md:pt-12 md:px-10 rounded shadow-md bg-[#E7E8D8] ">
            <h2 className="text-3xl mb-6 text-center">Register</h2>
            {error && <div className="text-red-500 mb-4">{error}</div>}
            <form onSubmit={handleRegister}>
              <input type="text" placeholder="Name" className="w-full p-2 mb-4 border-2 border-black rounded-lg" required
              value={name}
              onChange={(e) => setName(e.target.value)} />
              <input
                type="email"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full p-2 mb-4 border-2 border-black rounded-lg"
                required
              />
              <input
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full p-2 mb-4 border-2 border-black rounded-lg"
                required
              />
              <button
                type="submit"
                className="w-full p-2 bg-[#FF9D3D] text-white rounded-lg"
              >
                Register
              </button>
            </form>
            <div>
            <h1 className='mt-3 text-blue-700'><Link to='/Clogin'>Already Counselor Sign In Here--</Link></h1>
            </div>
          </div>
          </div>
        </div>
  );
};

export default CounselorRegister;
