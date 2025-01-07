import React, { createContext, useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const UserContext = createContext();


export const UserProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [selectedFlightId, setSelectedFlightId] = useState(null);
    const navigate = useNavigate();
    const [amount, setAmount] = useState(0);
    const [payment, setPayment] = useState(0);

    useEffect(() => {
        const token = localStorage.getItem('token');
        if (!token){
            navigate('/login');
        }
    }, []);

    return (
        <UserContext.Provider value={{ user, setUser, selectedFlightId, setSelectedFlightId, amount, setAmount, payment, setPayment }}>
            {children}
        </UserContext.Provider>
    );
};

export const useAuth = () => {
    return useContext(UserContext);
};

export default UserContext;
