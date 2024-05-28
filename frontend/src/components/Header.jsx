// src/components/Header.js
import React from 'react';
import { Box, Flex, Text, Button, Link } from '@chakra-ui/react';
import { Link as RouterLink } from 'react-router-dom';
import ColorModeSwitcher from '../components/colorModeSwitcher';

const Header = () => {
  return (
    <Box bg="black" color="purple" py={4}>
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
            <Button colorScheme="purple" variant="outline">
              Transactions
            </Button>
          </Link>
          <Link as={RouterLink} to="/settings" mr={4}>
            <Button colorScheme="purple" variant="outline">
              Settings
            </Button>
          </Link>
          <ColorModeSwitcher />
        </Flex>
      </Flex>
    </Box>
  );
};

export default Header;
