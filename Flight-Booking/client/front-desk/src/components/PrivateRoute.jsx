import React from 'react';
import { Navigate } from 'react-router-dom';

const PrivateRoute = ({ children }) => {
  const token = localStorage.getItem('token');

  // If token exists allow rendering the child (protected page)
  // otherwise redirect to /login
  return token ? children : <Navigate to="/login" replace />;
};

export default PrivateRoute;
