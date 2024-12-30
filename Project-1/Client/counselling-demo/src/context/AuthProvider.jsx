import React, { createContext, useContext, useState } from 'react';
export const AuthContext = createContext();
export const AuthProvider = ({ children }) => {
  const [payment, setPayment] = useState(0);
  const [amount, setAmount] = useState(0);

  return  (
    <AuthContext.Provider value={{ payment, setPayment, amount, setAmount }}>
      {children}
    </AuthContext.Provider>
  );

  };

  export const useAuth = () => {
    return useContext(AuthContext);
  };

  export default AuthProvider;