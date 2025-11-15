import React, { useReducer } from 'react';
import { useNavigate } from 'react-router-dom';
import { registerUser } from '../services/api';
import { Link } from 'react-router-dom';
import { message } from 'antd';
import register1 from '../assets/images/register1.jpg';

// Initial State
const initialState = {
  name: '',
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

const Register = () => {
  const [state, dispatch] = useReducer(reducer, initialState);
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();

    // Prevent multiple clicks when loading
    if (state.loading) return;

    dispatch({ type: 'SET_LOADING', loading: true });
    dispatch({ type: 'SET_ERROR', error: '' });

    try {
      const res = await registerUser(state.name, state.email, state.password);
      message.success('Registration successful');
      navigate('/login');
      return res.data;
    } catch (err) {
      message.error('Registration failed');
      dispatch({ type: 'SET_ERROR', error: 'Error during registration' });
    } finally {
      dispatch({ type: 'SET_LOADING', loading: false });
    }
  };

  return (
    <div className="flex justify-center items-center bg-[#D9EAFD] mb-10 mt-10 rounded-lg">
      <div className="md:flex border rounded-lg">
        <img src={register1} alt="img" className="h-60 w-full md:h-96 md:w-3/4" />
        
        <div className="p-6 max-w-sm mx-auto md:pt-12 md:px-10 rounded shadow-md bg-[#E7E8D8]">
          <h2 className="text-3xl mb-6 text-center">Register</h2>
          {state.error && <div className="text-red-500 mb-4">{state.error}</div>}

          <form onSubmit={handleRegister}>
            <input
              type="text"
              placeholder="Name"
              className="w-full p-2 mb-4 border-2 border-black rounded-lg"
              required
              value={state.name}
              onChange={(e) =>
                dispatch({ type: 'SET_FIELD', field: 'name', value: e.target.value })
              }
            />
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
              className={`w-full p-2 text-white rounded-lg ${
                state.loading ? 'bg-gray-400 cursor-not-allowed' : 'bg-[#FF9D3D] hover:bg-[#e68a2b]'
              }`}
              disabled={state.loading}
            >
              {state.loading ? 'Registering...' : 'Register'}
            </button>
          </form>

          <p className="mt-2 text-blue-500">
            <Link to="/login">Already a User? Sign in --</Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Register;
