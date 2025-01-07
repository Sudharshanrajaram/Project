import React, { useState, useContext } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import UserContext from '../context/UserContext';
import { loginUser } from '../services/api';

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const { setUser } = useContext(UserContext);
    const history = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();
        try {
            const response = await loginUser({ email, password });
            localStorage.setItem('token', response.token);
            localStorage.setItem('userId', response.userId);
            localStorage.setItem('User', response.userName);
            setUser({ email });
            history('/');
            window.location.reload();
        } catch (err) {
            console.error('Login failed', err);
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
                            className="w-full py-3 bg-blue-500 text-white text-lg font-semibold rounded-lg shadow-md transform transition-all duration-200 hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        >
                            Log In
                        </button>
                    </div>
                </form>
                
                {/* Forgot Password Link
                <div className="text-center mt-4">
                    <a href="/forgot-password" className="text-blue-500 font-semibold">Forgot Password?</a>
                </div>
                 */}
                {/* Sign Up Link */}
                <div className="text-center mt-4">
                    <p className="text-sm text-gray-600">Don't have an account? 
                        <a href="/register" className="text-blue-500 font-semibold"> <Link to='/register'>Sign Up</Link></a>
                    </p>
                </div>
            </div>
        </div>
    );
};

export default Login;
