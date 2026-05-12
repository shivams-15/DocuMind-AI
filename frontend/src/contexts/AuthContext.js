import React, { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext();

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [username, setUsername] = useState('');
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Check if user is already authenticated on app load
    const authStatus = localStorage.getItem('isAuthenticated');
    const storedUsername = localStorage.getItem('username');
    
    if (authStatus === 'true' && storedUsername) {
      setIsAuthenticated(true);
      setUsername(storedUsername);
    }
    
    setIsLoading(false);
  }, []);

  const login = (user) => {
    setIsAuthenticated(true);
    setUsername(user);
    localStorage.setItem('isAuthenticated', 'true');
    localStorage.setItem('username', user);
  };

  const logout = () => {
    setIsAuthenticated(false);
    setUsername('');
    localStorage.removeItem('isAuthenticated');
    localStorage.removeItem('username');
  };

  const value = {
    isAuthenticated,
    username,
    login,
    logout,
    isLoading
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};