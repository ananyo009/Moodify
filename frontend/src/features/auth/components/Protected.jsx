import React from 'react'
import { useAuth } from '../hook/useAuth'
import { Link, Navigate } from 'react-router';

const Protected = ({ children }) => {
  const { user, loading } = useAuth();

  if (loading) {
    return <h1>Loading...</h1>;
  }

  if (!user) {
    return <Navigate to="/login" />;
  }

  if (loading) {
    return <h1>Loading...</h1>;
  }

  return children;
};

export default Protected;