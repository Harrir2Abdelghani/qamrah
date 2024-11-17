// src/components/ProtectedRoute.js
import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { isAuthenticated } from '../utils/auth'; // Import your authentication check

const ProtectedRoute = ({ element }) => {
  const location = useLocation();

  return isAuthenticated() ? (
    element
  ) : (
    <Navigate to="/signin" state={{ from: location }} replace />
  );
};

export default ProtectedRoute;

