import React, { useState, useReducer } from 'react';
import { registerUser } from '../services/api';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

// Reducer function for managing state
const initialState = { loading: false, error: null };

const reducer = (state, action) => {
    switch (action.type) {
        case 'REGISTER_START':
            return { ...state, loading: true, error: null };
        case 'REGISTER_SUCCESS':
            return { ...state, loading: false };
        case 'REGISTER_ERROR':
            return { ...state, loading: false, error: action.payload };
        default:
            return state;
    }
};

const Register = () => {
    const [state, dispatch] = useReducer(reducer, initialState);
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const history = useNavigate();

    const handleRegister = async (e) => {
        e.preventDefault();
        dispatch({ type: 'REGISTER_START' });

        try {
            await registerUser({ username, email, password });
            toast.success('Registration Successful');
            dispatch({ type: 'REGISTER_SUCCESS' });
            history('/login');
        } catch (err) {
            toast.error('Registration Failed');
            dispatch({ type: 'REGISTER_ERROR', payload: err.message });
        }
    };

    return (
        <div className="min-h-screen flex justify-center items-center bg-gradient-to-r from-blue-500 to-teal-400">
            <div className="bg-white p-8 rounded-lg shadow-lg max-w-md w-full">
                <h2 className="text-3xl font-bold text-center text-gray-800 mb-6">Create an Account</h2>
                <form onSubmit={handleRegister} className="space-y-6">
                    
                    {/* Name Field */}
                    <div>
                        <input
                            type="text"
                            placeholder="Full Name"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                    </div>

                    {/* Email Field */}
                    <div>
                        <input
                            type="email"
                            placeholder="Email Address"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                    </div>

                    {/* Password Field */}
                    <div>
                        <input
                            type="password"
                            placeholder="Password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                    </div>

                    {/* Submit Button */}
                    <div>
                        <button
                            type="submit"
                            className={`w-full py-3 text-white text-lg font-semibold rounded-lg shadow-md transform transition-all duration-200 
                            ${state.loading ? 'bg-gray-400 cursor-not-allowed' : 'bg-blue-500 hover:bg-blue-600 focus:ring-2 focus:ring-blue-500'}`}
                            disabled={state.loading}
                        >
                            {state.loading ? 'Registering...' : 'Register'}
                        </button>
                    </div>

                    {/* Error Message */}
                    {state.error && (
                        <p className="text-red-500 text-sm text-center mt-2">{state.error}</p>
                    )}
                </form>

                <div className="text-center mt-4">
                    <p className="text-sm text-gray-600">
                        Already have an account?{' '}
                        <a href="/login" className="text-blue-500 font-semibold">Log In</a>
                    </p>
                </div>
            </div>
        </div>
    );
};

export default Register;
