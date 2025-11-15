import React, { useState, useReducer, useContext } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import UserContext from '../context/UserContext';
import { loginUser } from '../services/api';
import { toast } from 'react-toastify';

// Reducer function for managing state
const initialState = { loading: false, error: null };

const reducer = (state, action) => {
    switch (action.type) {
        case 'LOGIN_START':
            return { ...state, loading: true, error: null };
        case 'LOGIN_SUCCESS':
            return { ...state, loading: false };
        case 'LOGIN_ERROR':
            return { ...state, loading: false, error: action.payload };
        default:
            return state;
    }
};

const Login = () => {
    const [state, dispatch] = useReducer(reducer, initialState);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const { setUser } = useContext(UserContext);
    const history = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();
        dispatch({ type: 'LOGIN_START' });

        try {
            const response = await loginUser({ email, password });
            localStorage.setItem('token', response.token);
            localStorage.setItem('userId', response.userId);
            localStorage.setItem('User', response.userName);
            setUser({ email });

            toast.success('Login Successful');
            dispatch({ type: 'LOGIN_SUCCESS' });

            history('/flightSearch');
            window.location.reload();
        } catch (err) {
            toast.error('Login Failed');
            dispatch({ type: 'LOGIN_ERROR', payload: err.message });
        }
    };

    return (
        <div className="min-h-screen flex justify-center items-center bg-gradient-to-r from-blue-500 to-teal-400">
            <div className="bg-white p-8 rounded-lg shadow-lg max-w-md w-full">
                <h2 className="text-3xl font-bold text-center text-gray-800 mb-6">Welcome Back</h2>
                <p className="text-center text-gray-600 mb-6">Please enter your credentials to log in</p>

                <form onSubmit={handleLogin} className="space-y-6">
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
                            {state.loading ? 'Logging in...' : 'Log In'}
                        </button>
                    </div>

                    {/* Error Message */}
                    {state.error && (
                        <p className="text-red-500 text-sm text-center mt-2">{state.error}</p>
                    )}
                </form>

                {/* Forgot Password Link */}
                {/* <div className="text-center mt-4">
                    <a href="/forgot-password" className="text-blue-500 font-semibold">Forgot Password?</a>
                </div> */}

                {/* Sign Up Link */}
                <div className="text-center mt-4">
                    <p className="text-sm text-gray-600">
                        Don't have an account?{' '}
                        <Link to='/register' className="text-blue-500 font-semibold">Sign Up</Link>
                    </p>
                </div>
            </div>
        </div>
    );
};

export default Login;
