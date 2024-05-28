// src/components/Register.jsx
import React, { useState, useContext, useEffect } from 'react';
import { AuthContext } from './context';
import { useNavigate } from 'react-router-dom';
import {
  Box,
  Flex,
  Heading,
  Text,
  Input,
  Button,
  useColorModeValue,
  Spinner,
} from '@chakra-ui/react';

const Register = () => {
  const { handleRegister, isLoading, message } = useContext(AuthContext);
  const [userData, setUserData] = useState({
    name: '',
    email: '',
    password: '',
  });
  const navigate = useNavigate();
  const bgColor = useColorModeValue('purple.100', 'purple.900');
  const textColor = useColorModeValue('purple.900', 'white');

  useEffect(() => {
    if (message === 'Registration successful. Redirecting to login...') {
      setTimeout(() => {
        navigate('/login');
      }, 3000);
    }
  }, [message, navigate]);

  const handleChange = (e) => {
    setUserData({ ...userData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    handleRegister(userData);
  };

  return (
    <Flex justify="center" align="center" minH="100vh" bg={bgColor}>
      <Box
        borderWidth={1}
        px={8}
        py={12}
        borderRadius={8}
        boxShadow="lg"
        bg="white"
      >
        <Box textAlign="center">
          <Heading color={textColor}>Register</Heading>
        </Box>
        {isLoading && (
          <Flex justify="center" mt={4}>
            <Spinner color={textColor} />
          </Flex>
        )}
        {message && (
          <Text color={textColor} mt={4}>
            {message}
          </Text>
        )}
        <Box my={4} textAlign="left">
          <form onSubmit={handleSubmit}>
            <Input
              placeholder="Name"
              name="name"
              value={userData.name}
              onChange={handleChange}
              mb={4}
            />
            <Input
              placeholder="Email"
              name="email"
              type="email"
              value={userData.email}
              onChange={handleChange}
              mb={4}
            />
            <Input
              placeholder="Password"
              name="password"
              type="password"
              value={userData.password}
              onChange={handleChange}
              mb={6}
            />
            <Button
              colorScheme="purple"
              type="submit"
              width="full"
              fontWeight="bold"
            >
              Register
            </Button>
          </form>
        </Box>
      </Box>
    </Flex>
  );
};

export default Register;