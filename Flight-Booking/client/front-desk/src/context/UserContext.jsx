import React, { createContext, useState, useContext } from 'react';

const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [selectedFlightId, setSelectedFlightId] = useState(null);
  const [amount, setAmount] = useState(0);
  const [payment, setPayment] = useState(0);

  // NOTE: removed automatic navigate('/login') on mount
  // so public pages (Home, FlightSearch) are accessible when token is missing.

  return (
    <UserContext.Provider
      value={{
        user,
        setUser,
        selectedFlightId,
        setSelectedFlightId,
        amount,
        setAmount,
        payment,
        setPayment
      }}
    >
      {children}
    </UserContext.Provider>
  );
};

export const useAuth = () => useContext(UserContext);

export default UserContext;
