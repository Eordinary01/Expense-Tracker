import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../context";
import { getTransactions, createTransaction } from "../api";
import {
  Box,
  Container,
  Heading,
  VStack,
  Text,
  Button,
  Input,
  Select,
  useColorModeValue,
  Flex,
  Stack,
  Spinner,
} from "@chakra-ui/react";
import { format } from "date-fns";
import { Bar } from "react-chartjs-2";
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from "chart.js";

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const Dashboard = () => {
  const { user, token, handleLogout } = useContext(AuthContext);
  const [transactions, setTransactions] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [newTransaction, setNewTransaction] = useState({
    description: "",
    amount: "",
    type: "income",
  });
  const [isCreating, setIsCreating] = useState(false);

  const bgColor = useColorModeValue("gray.100", "gray.900");
  const textColor = useColorModeValue("gray.900", "gray.100");
  const cardBgColor = useColorModeValue("white", "gray.800");
  const incomeColor = useColorModeValue("green.500", "green.300");
  const expenseColor = useColorModeValue("red.500", "red.300");
  const buttonBgColor = useColorModeValue("purple.500", "purple.300");
  const buttonTextColor = useColorModeValue("white", "gray.800");
  const incomeBoxBgColor = useColorModeValue("green.50", "green.900");
  const expenseBoxBgColor = useColorModeValue("red.50", "red.900");

  useEffect(() => {
    const fetchTransactions = async () => {
      try {
        setIsLoading(true);
        setError(null);
        const data = await getTransactions(token);
        setTransactions(data);
      } catch (error) {
        setError("Failed to fetch transactions");
        console.error("Failed to fetch transactions:", error);
      } finally {
        setIsLoading(false);
      }
    };

    if (token) {
      fetchTransactions();
    }
  }, [token, user]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewTransaction({ ...newTransaction, [name]: value });
  };

  const handleCreateTransaction = async () => {
    try {
      setIsCreating(true);
      const newTransactionData = await createTransaction(newTransaction, token);
      setTransactions([...transactions, newTransactionData]);
      setNewTransaction({ description: "", amount: "", type: "income" });
    } catch (error) {
      console.error("Error creating transaction:", error);
    } finally {
      setIsCreating(false);
    }
  };

  if (isLoading) {
    return <Text>Loading...</Text>;
  }

  if (error) {
    return <Text>Error: {error}</Text>;
  }

  if (!user) {
    return <Text>Unauthorized</Text>;
  }

  const incomeTransactions = transactions.filter((transaction) => transaction.type === "income");
  const expenseTransactions = transactions.filter((transaction) => transaction.type === "expense");

  const chartData = {
    labels: ["Income", "Expenses"],
    datasets: [
      {
        label: "Amount",
        data: [
          incomeTransactions.reduce((total, transaction) => total + transaction.amount, 0),
          expenseTransactions.reduce((total, transaction) => total + transaction.amount, 0),
        ],
        backgroundColor: [incomeColor, expenseColor],
        borderColor: [incomeColor, expenseColor],
        borderWidth: 1,
      },
    ],
  };

  return (
    <Box bg={bgColor} color={textColor} minH="100vh" p={4}>
      <Container maxW="container.lg">
        <Flex justify="space-between" align="center" mb="6">
          <Heading as="h2" size="xl" textAlign="center">
            Dashboard
          </Heading>
        </Flex>
        <Text mb="4" textAlign="center">
          Welcome, {user.name || "User"}
        </Text>

        <Flex justify="space-between" mb="6">
          <Box p={4} borderWidth="1px" borderRadius="lg" bg={cardBgColor} flex="1" mr="2">
            <Heading size="md" mb="4" color={incomeColor}>
              Income
            </Heading>
            {incomeTransactions.map((transaction) => (
              <Box
                key={transaction._id}
                p={3}
                borderWidth="1px"
                borderRadius="md"
                mb={2}
                color={incomeColor}
                bg={incomeBoxBgColor}
              >
                <Text>
                  <strong>Description:</strong> {transaction.description}
                </Text>
                <Text>
                  <strong>Amount:</strong> ₹{transaction.amount}
                </Text>
                <Text>
                  <strong>Date:</strong> {format(new Date(transaction.createdAt), "PPpp")}
                </Text>
              </Box>
            ))}
          </Box>

          <Box p={4} borderWidth="1px" borderRadius="lg" bg={cardBgColor} flex="1" ml="2">
            <Heading size="md" mb="4" color={expenseColor}>
              Expenses
            </Heading>
            {expenseTransactions.map((transaction) => (
              <Box
                key={transaction._id}
                p={3}
                borderWidth="1px"
                borderRadius="md"
                mb={2}
                color={expenseColor}
                bg={expenseBoxBgColor}
              >
                <Text>
                  <strong>Description:</strong> {transaction.description}
                </Text>
                <Text>
                  <strong>Amount:</strong> ₹{transaction.amount}
                </Text>
                <Text>
                  <strong>Date:</strong> {format(new Date(transaction.createdAt), "PPpp")}
                </Text>
              </Box>
            ))}
          </Box>
        </Flex>

        <Box p={6} borderWidth="1px" borderRadius="lg" bg={cardBgColor} mt={6}>
          <Heading size="md" mb="4">
            Add New Transaction
          </Heading>
          <Stack spacing={4}>
            <Input
              name="description"
              placeholder="Description"
              value={newTransaction.description}
              onChange={handleInputChange}
            />
            <Input
              name="amount"
              placeholder="Amount"
              type="number"
              value={newTransaction.amount}
              onChange={handleInputChange}
            />
            <Select name="type" value={newTransaction.type} onChange={handleInputChange}>
              <option value="income">Income</option>
              <option value="expense">Expense</option>
            </Select>
            <Button
              bg={buttonBgColor}
              color={buttonTextColor}
              _hover={{ bg: buttonBgColor }}
              onClick={handleCreateTransaction}
              isLoading={isCreating}
            >
              Create Transaction
            </Button>
          </Stack>
        </Box>

        <Box mt={8}>
          <Heading size="md" mb="4">
            Income vs Expenses
          </Heading>
          <Bar data={chartData} />
        </Box>

        <Button
          mt={8}
          bg={buttonBgColor}
          color={buttonTextColor}
          _hover={{ bg: buttonBgColor }}
          onClick={handleLogout}
        >
          Logout
        </Button>
      </Container>
    </Box>
  );
};

export default Dashboard;
