// src/App.js
import React, { useEffect, useState, useContext } from "react";
import { Route, Routes, useNavigate,Navigate} from "react-router-dom";
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
} from "@chakra-ui/react";
import Header from "./components/Header";
import Dashboard from "./components/Dashboard";
import Login from "./components/Login";
import Register from "./components/Register";
// import Transactions from './components/Transactions';
// import Settings from './components/Settings';
import { AuthContext } from "./components/context";

const App = () => {
  const { user } = useContext(AuthContext);
  const { isOpen, onOpen, onClose } = useDisclosure({ defaultIsOpen: true }); // Set defaultIsOpen to true
  const navigate = useNavigate();


  useEffect(() => {
    if (user) {
      navigate('/dashboard');
    }
  }, [user, navigate]);


  const handleUserChoice = (choice) => {
    onClose();
    if (choice) {
      // Do nothing since Register is already rendered on the root route
    } else {
      navigate('/login');
    }
  };

  return (
    <ChakraProvider>
      <Header />
      <Routes>
        <Route
          path="/dashboard"
          element={user ? <Dashboard /> : <Navigate to="/login" replace />}
        />
        <Route path="/login" element={<Login />} />
        <Route path="/" element={<Register />} />
        {/* Render Register component on the root route */}
      </Routes>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Welcome</ModalHeader>
          <ModalBody>
            <p>Are you a new user?</p>
          </ModalBody>
          <ModalFooter>
            <Button
              colorScheme="blue"
              mr={3}
              onClick={() => handleUserChoice(true)}
            >
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
