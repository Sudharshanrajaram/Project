// src/pages/Login.jsx
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { loginUser } from '../services/api';
import { Link } from 'react-router-dom';
import { message } from 'antd';
import login1 from '../assets/images/login1.webp';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await loginUser( email, password );
      localStorage.setItem('token',response.token );
      message.success('Login successful');
      navigate('/dashboard');
    } catch (err) {
      message.error('Login failed');
      setError('Invalid credentials');
    }
  };

  return (
    <div className="bg-[#D9EAFD] flex justify-center mb-10 items-center bg-gray-100">
      <div>
        <img src={login1} alt="login" className="md:mt-10 md:ml-20 " />
      </div>
      <div className="p-6 max-w-sm mx-auto bg-[#E7E8D8] rounded-lg  md:py-8 md:px-10  shadow-md">
        <h2 className="text-3xl mb-6 text-center">Login</h2>
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
        <p className="mt-4 text-blue-500"><Link to='/register'>New Here ? Sign Up --</Link></p>
        <div>
        <h1 className='mt-4 text-red-600'><Link to='/Clogin'>Click Here -- For Counselor Login</Link></h1>
      </div>
      </div>
    </div>
  );
};

export default Login;
