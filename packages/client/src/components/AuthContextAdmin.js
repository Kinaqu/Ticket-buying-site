import React, { createContext, useContext, useState } from 'react';

const AuthContextAdmin = createContext();

export const AuthProviderAdmin = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [userRole, setUserRole] = useState('');

  const login = () => {
    setIsAuthenticated(true);
    setUserRole('admin');
  };

  const isAuthenticatedAsAdmin = () => {
    return isAuthenticated && userRole === 'admin';
  };

  const logout = () => {
    setIsAuthenticated(false);
    setUserRole('');
  };

  return (
    <AuthContextAdmin.Provider value={{ isAuthenticated, userRole, login, logout, isAuthenticatedAsAdmin }}>
      {children}
    </AuthContextAdmin.Provider>
  );
};

export const useAuthAdmin = () => {
  const context = useContext(AuthContextAdmin);
  if (!context) {
    throw new Error('useAuthAdmin must be used within an AuthProviderAdmin');
  }
  return context;
};
