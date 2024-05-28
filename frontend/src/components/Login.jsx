// src/components/Login.jsx
import React, { useContext, useState, useEffect } from 'react';
import { AuthContext } from './context/index';
import { useNavigate } from 'react-router-dom';
import {
  Box,
  Button,
  Container,
  FormControl,
  FormLabel,
  Input,
  VStack,
  Flex,
  Heading,
  Text,
  useColorModeValue,
  Spinner,
} from '@chakra-ui/react';

const Login = () => {
  const { handleLogin, isLoading, message, setMessage } = useContext(AuthContext);
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    name: '', // Added name field
  });
  const { email, password, name } = formData;
  const navigate = useNavigate();
  const bgColor = useColorModeValue('purple.100', 'purple.900');
  const textColor = useColorModeValue('purple.900', 'white');

  useEffect(() => {
    if (message === 'Login successful. Redirecting to Dashboard!') {
      setTimeout(() => {
        navigate('/dashboard');
        setMessage(''); // Clear the message after redirection
      }, 3000);
    }
  }, [message, navigate, setMessage]);

  const onChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const onSubmit = (e) => {
    e.preventDefault();
    handleLogin(formData);
  };

  return (
    <Flex justify="center" align="center" minH="100vh" bg={bgColor}>
      <Container maxW="md">
        <Box
          borderWidth={1}
          px={8}
          py={12}
          borderRadius={8}
          boxShadow="lg"
          bg="white"
        >
          <Box textAlign="center">
            <Heading color={textColor}>Login</Heading>
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
            <form onSubmit={onSubmit}>
              <VStack spacing={4}>
                <FormControl id="name" isRequired>
                  <FormLabel>Name</FormLabel>
                  <Input
                    type="text"
                    name="name"
                    value={name}
                    onChange={onChange}
                  />
                </FormControl>
                <FormControl id="email" isRequired>
                  <FormLabel>Email address</FormLabel>
                  <Input
                    type="email"
                    name="email"
                    value={email}
                    onChange={onChange}
                  />
                </FormControl>
                <FormControl id="password" isRequired>
                  <FormLabel>Password</FormLabel>
                  <Input
                    type="password"
                    name="password"
                    value={password}
                    onChange={onChange}
                  />
                </FormControl>
                <Button type="submit" colorScheme="purple" size="md" width="full">
                  Login
                </Button>
              </VStack>
            </form>
          </Box>
        </Box>
      </Container>
    </Flex>
  );
};


export default Login;