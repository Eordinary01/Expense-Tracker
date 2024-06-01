import React, { useEffect, useContext } from "react";
import { Route, Routes, useNavigate, Navigate } from "react-router-dom";
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
import { AuthContext } from "./components/context";

const App = () => {
  const { token } = useContext(AuthContext);
  const { isOpen, onOpen, onClose } = useDisclosure({ defaultIsOpen: !token });
  const navigate = useNavigate();

  // useEffect(() => {
  //   if (token) {
  //     navigate("/dashboard");
  //   } else {
  //     navigate("/login");
  //   }
  // }, [token, navigate]);

  const handleUserChoice = (choice) => {
    onClose();
    if (choice) {
      navigate("/register");
    } else {
      navigate("/login");
    }
  };

  return (
    <ChakraProvider>
      <Header />
      <Routes>
        <Route
          path="/dashboard"
          element={token ? <Dashboard /> : <Navigate to="/login" replace />}
        />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/" element={<Navigate to={token ? "/dashboard" : "/login"} replace />} />
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
