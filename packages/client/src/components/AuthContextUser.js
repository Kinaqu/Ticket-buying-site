import React, { createContext, useContext, useState } from 'react';

const AuthContextUser = createContext();

export const AuthProviderUser = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [userRole, setUserRole] = useState('');
  const [user, setUser] = useState(null); // Добавлено новое поле для хранения пользователя

  const login = (userData) => {
    setIsAuthenticated(true);
    setUserRole('user');
    setUser(userData); // Установка информации о пользователе при успешной аутентификации
  };

  const isAuthenticatedAsUser = () => {
    return isAuthenticated && userRole === 'user';
  };

  const logout = () => {
    setIsAuthenticated(false);
    setUserRole('');
    setUser(null); // Обнуление информации о пользователе при выходе
  };

  return (
    <AuthContextUser.Provider value={{ isAuthenticated, userRole, user, login, logout, isAuthenticatedAsUser }}>
      {children}
    </AuthContextUser.Provider>
  );
};

export const useAuthUser = () => {
  const context = useContext(AuthContextUser);
  if (!context) {
    throw new Error('useAuthUser must be used within an AuthProviderUser');
  }
  return context;
};
