// src/App.js
import React, { useEffect, useState, useContext } from 'react';
import { Route, Routes, useNavigate } from 'react-router-dom';
import {
  ChakraProvider,
  useDisclosure,
  Button,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
} from '@chakra-ui/react';
import Header from './components/Header';
import Dashboard from './components/Dashboard';
import Login from './components/Login';
import Register from './components/Register';
// import Transactions from './components/Transactions';
// import Settings from './components/Settings';
import { AuthContext } from './components/context';

const App = () => {
  const { user } = useContext(AuthContext);
  const [isNewUser, setIsNewUser] = useState(null);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const navigate = useNavigate();

  useEffect(() => {
    if (user === null && isNewUser === null) {
      onOpen();
    } else if (user) {
      navigate('/dashboard');
    }
  }, [user, isNewUser, onOpen, navigate]);

  const handleUserChoice = (choice) => {
    setIsNewUser(choice);
    onClose();
    if (choice) {
      navigate('/register');
    } else {
      navigate('/login');
    }
  };

  return (
    <ChakraProvider>
      <Header />
      <Routes>
        <Route path="/dashboard" element={user ? <Dashboard /> : <Login />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        {/* <Route path="/transactions" element={user ? <Transactions /> : <Login />} />
        <Route path="/settings" element={user ? <Settings /> : <Login />} /> */}
        <Route path="/" element={!user ? <Dashboard /> : null} />
      </Routes>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Welcome</ModalHeader>
          <ModalBody>
            <p>Are you a new user?</p>
          </ModalBody>
          <ModalFooter>
            <Button colorScheme="blue" mr={3} onClick={() => handleUserChoice(true)}>
              Yes
            </Button>
            <Button variant="ghost" onClick={() => handleUserChoice(false)}>
              No
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </ChakraProvider>
  );
};

export default App;
