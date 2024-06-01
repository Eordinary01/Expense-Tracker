// src/context/AuthContext.js
import React, { createContext, useState, useEffect } from 'react';
import { jwtDecode } from 'jwt-decode'; // Use named import
import { register, login } from '../api';

const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(localStorage.getItem('token'));
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState('');

  useEffect(() => {
    if (token) {
      try {
        const decodedUser = jwtDecode(token);
        setUser(decodedUser);
        
      } catch (error) {
        console.error('Failed to decode token:', error);
        localStorage.removeItem('token');
        setToken(null);
      }
    }
  }, [token]);

  const handleRegister = async (userData) => {
    setIsLoading(true);
    setMessage('');
    try {
      const data = await register(userData);
      setToken(data.token);
     
      localStorage.setItem('token', data.token);
      const decodedUser = jwtDecode(data.token);
      setUser(decodedUser);
      setMessage('Registration successful. Redirecting to login...');
      setTimeout(() => {
        setMessage('');
      }, 3000);
    } catch (error) {
      console.error('Registration error:', error);
      if (error.response && error.response.data.errors) {
        setMessage(error.response.data.errors.map((err) => err.msg).join(', '));
      } else {
        setMessage('An error occurred during registration.');
      }
    } finally {
      setIsLoading(false);
    }
  };

  const handleLogin = async (userData) => {
    setIsLoading(true);
    setMessage('');
    try {
      const data = await login(userData);
      setToken(data.token);
      console.log(userData)
      localStorage.setItem('token', data.token);
      const decodedUser = jwtDecode(data.token);
      setUser(decodedUser);
      setMessage('Login successful. Redirecting to Dashboard!');
      setTimeout(() => {
        setMessage('');
      }, 3000);
    } catch (error) {
      console.error('Login error:', error);
      if (error.response && error.response.data.msg) {
        setMessage(error.response.data.msg);
      } else {
        setMessage('An error occurred during login.');
      }
      setUser(null);
    } finally {
      setIsLoading(false);
    }
  };

  const handleLogout = () => {
    setUser(null);
    setToken(null);
    localStorage.removeItem('token');
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        token,
        isLoading,
        message,
        setMessage,
        handleRegister,
        handleLogin,
        handleLogout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};


export { AuthContext, AuthProvider };