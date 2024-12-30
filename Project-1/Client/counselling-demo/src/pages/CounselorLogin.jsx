import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { loginCounselor } from '../services/api';
import { Link } from 'react-router-dom';
import { message } from 'antd';
import login1 from '../assets/images/login1.webp';


const CounselorLogin = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await loginCounselor( email, password );
      localStorage.setItem('token',response.token );
      localStorage.setItem('role', response.role);
      localStorage.setItem('id', response.id);
      message.success('Login successful');
      navigate('/Cdashboard');
    } catch (err) {
      message.error('Login failed');
      setError('Invalid credentials');
    }
  };

  return (
    <div className="bg-[#D9EAFD] md:ml-20 flex justify-center mb-10 items-center bg-gray-100">
          <div>
            <img src={login1} alt="login" className="md:mt-10 " />
          </div>
          <div className="p-6 max-w-sm mx-auto bg-[#E7E8D8] rounded-lg  md:py-8 md:px-10  shadow-md">
            <h2 className="text-3xl mb-6 text-center">Counselor Login</h2>
            {error && <div className="text-red-500 mb-4">{error}</div>}
            <form onSubmit={handleLogin} className=' p-4 rounded-lg'>
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
                className="w-full p-2 bg-[#FF9D3D] text-white rounded"
              >
                Login
              </button>
            </form>
            <div>
            <h1 className='mt-3 text-blue-700'><Link to='/Cregister'>Counselor Sign Up Here--</Link></h1>
            <p className='mt-2 text-blue-700'><Link to='/login'>User Sign in Goes Here --</Link></p>
        </div>
          </div>
        </div>
  );
};

export default CounselorLogin;
