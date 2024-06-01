// src/components/Header.js
import React, { useContext } from 'react';
import { Box, Flex, Text, Button, Link, useColorMode, useColorModeValue } from '@chakra-ui/react';
import { Link as RouterLink } from 'react-router-dom';
import { AuthContext } from './context';

const Header = () => {
  const { colorMode, toggleColorMode } = useColorMode();
  const bgColor = useColorModeValue('white', 'black');
  const textColor = useColorModeValue('purple', 'purple');
  const buttonBgColor = useColorModeValue('purple.500', 'purple.300');
  const buttonTextColor = useColorModeValue('white', 'black');
  const { token, handleLogout } = useContext(AuthContext);

  return (
    <Box bg={bgColor} color={textColor} py={4}>
      <Flex justifyContent="space-between" alignItems="center" maxW="1200px" mx="auto" px={4}>
        <Text fontSize="xl" fontWeight="bold">
          Expense Tracker
        </Text>
        <Flex alignItems="center">
          <Link as={RouterLink} to="/dashboard" mr={4}>
            <Button colorScheme="purple" variant="outline">
              Dashboard
            </Button>
          </Link>
          <Link as={RouterLink} to="/transactions" mr={4}>
            <Button colorScheme="purple" variant="outline" isDisabled>
              Transactions
            </Button>
          </Link>
          <Link as={RouterLink} to="/settings" mr={4}>
            <Button colorScheme="purple" variant="outline" isDisabled>
              Settings
            </Button>
          </Link>
          {token ? (
            <Button onClick={handleLogout} colorScheme="red" ml={4}>
              Logout
            </Button>
          ) :
           (
            <>
              <Link as={RouterLink} to="/login" mr={4}>
                <Button colorScheme="purple" variant="outline" isDisabled>
                  Login
                </Button>
              </Link>
              <Link as={RouterLink} to="/register" mr={4}>
                <Button colorScheme="purple" variant="outline" isDisabled>
                  Register
                </Button>
              </Link>
            </>
          )
          }
          <Button onClick={toggleColorMode} bg={buttonBgColor} color={buttonTextColor} ml={4}>
            {colorMode === 'light' ? 'Dark Mode' : 'Light Mode'}
          </Button>
        </Flex>
      </Flex>
    </Box>
  );
};

export default Header;
