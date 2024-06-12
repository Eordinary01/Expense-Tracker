import axios from "axios";

const API_URL = "https://expense-tracker-xi-eight.vercel.app/api";

const register = async (userData) => {
  try {
    const response = await axios.post(`${API_URL}/auth/signup`, userData);
    return response.data;
  } catch (error) {
    // Handle validation errors and other errors from the server
    if (error.response && error.response.status === 400) {
      console.error('Validation errors:', error.response.data.errors);
    } else {
      console.error('Registration error:', error);
    }
    throw error;
  }
};

const login = async (userData) => {
  try {
    const response = await axios.post(`${API_URL}/auth/login`, userData);
    return response.data;
  } catch (error) {
    console.error('Login error:', error);
    throw error;
  }
};

// Example function to create a new transaction
const createTransaction = async (transactionData) => {
  const token = localStorage.getItem('token');
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  try {
    const response = await axios.post(
      `${API_URL}/transactions`,
      transactionData,
      config
    );
    return response.data;
  } catch (error) {
    console.error('Error creating transaction:', error.response.data);
    throw error;
  }
};

const getTransactions = async (token) => {
  if (!token) {
    console.error('No token found');
    throw new Error('No token, authorization denied');
  }

  try {
    // console.log('Fetching transactions with token:', token);
    const response = await axios.get(`${API_URL}/transactions`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error('Error fetching transactions:', error.response ? error.response.data : error);
    throw error;
  }
};

export { register, login, createTransaction, getTransactions };