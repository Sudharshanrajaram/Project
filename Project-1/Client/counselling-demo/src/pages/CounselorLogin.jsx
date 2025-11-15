import React, { useReducer } from 'react';
import { useNavigate } from 'react-router-dom';
import { loginCounselor } from '../services/api';
import { Link } from 'react-router-dom';
import { message } from 'antd';
import login1 from '../assets/images/login1.webp';

// Initial State
const initialState = {
  email: '',
  password: '',
  loading: false,
  error: '',
};

// Reducer Function
const reducer = (state, action) => {
  switch (action.type) {
    case 'SET_FIELD':
      return { ...state, [action.field]: action.value };
    case 'SET_LOADING':
      return { ...state, loading: action.loading };
    case 'SET_ERROR':
      return { ...state, error: action.error };
    default:
      return state;
  }
};

const CounselorLogin = () => {
  const [state, dispatch] = useReducer(reducer, initialState);
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();

    // Prevent multiple clicks when loading
    if (state.loading) return;

    dispatch({ type: 'SET_LOADING', loading: true });
    dispatch({ type: 'SET_ERROR', error: '' });

    try {
      const response = await loginCounselor(state.email, state.password);
      localStorage.setItem('token', response.token);
      localStorage.setItem('role', response.role);
      localStorage.setItem('id', response.id);
      message.success('Login successful');
      navigate('/Cdashboard');
    } catch (err) {
      message.error('Login failed');
      dispatch({ type: 'SET_ERROR', error: 'Invalid credentials' });
    } finally {
      dispatch({ type: 'SET_LOADING', loading: false });
    }
  };

  return (
    <div className="bg-[#D9EAFD] md:ml-20 flex justify-center mb-10 items-center bg-gray-100">
      <div>
        <img src={login1} alt="login" className="md:mt-10" />
      </div>
      <div className="p-6 max-w-sm mx-auto bg-[#E7E8D8] rounded-lg md:py-8 md:px-10 shadow-md">
        <h2 className="text-3xl mb-6 text-center">Counselor Login</h2>
        {state.error && <div className="text-red-500 mb-4">{state.error}</div>}

        <form onSubmit={handleLogin} className="p-4 rounded-lg">
          <input
            type="email"
            placeholder="Email"
            value={state.email}
            onChange={(e) =>
              dispatch({ type: 'SET_FIELD', field: 'email', value: e.target.value })
            }
            className="w-full p-2 mb-4 border-2 border-black rounded-lg"
            required
          />
          <input
            type="password"
            placeholder="Password"
            value={state.password}
            onChange={(e) =>
              dispatch({ type: 'SET_FIELD', field: 'password', value: e.target.value })
            }
            className="w-full p-2 mb-4 border-2 border-black rounded-lg"
            required
          />
          <button
            type="submit"
            className={`w-full p-2 text-white rounded ${
              state.loading ? 'bg-gray-400 cursor-not-allowed' : 'bg-[#FF9D3D] hover:bg-[#e68a2b]'
            }`}
            disabled={state.loading}
          >
            {state.loading ? 'Logging in...' : 'Login'}
          </button>
        </form>

        <div>
          <h1 className="mt-3 text-blue-700">
            <Link to="/Cregister">Counselor Sign Up Here--</Link>
          </h1>
          <p className="mt-2 text-blue-700">
            <Link to="/login">User Sign in Goes Here --</Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default CounselorLogin;
