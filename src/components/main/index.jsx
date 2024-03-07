import { Button, Flex, Heading, useDisclosure } from "@chakra-ui/react";
import Summary from "../summary";
import ExpenseView from "../expense-view";
import { useContext, useEffect } from "react";
import { GlobalContext } from "../../context";

export default function Main() {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const {
    totalExpense,
    allTransactions,
    setTotalExpense,
    totalIncome,
    setTotalIncome  } = useContext(GlobalContext);

  useEffect(() => {
    if (!allTransactions) return;

    let income = 0;
    let expense = 0;

    allTransactions.forEach((item) => {
        if (item && item.type === "income") {
          income += parseFloat(item.amount);
        } else if (item && item.type === "expense") {
          expense += parseFloat(item.amount);
        }
      });
      setTotalExpense(expense);
      setTotalIncome(income);
    }, [allTransactions]);

  return (
    <Flex textAlign={"center"} flexDirection={"column"} pr={"5"} pl={"5"}>
      <Flex alignItems={"center"} justifyContent={"space-between"} mt={"12"}>
        <Heading
          color={"purple.700"}
          display={["none", "block", "block", "block"]}
        >
          Expense Tracker
        </Heading>
        <Flex alignItems={"center"}>
          <Button onClick={onOpen} bg={"black"} color={"purple.500"} ml={"4"}>
            Add New Transaction
          </Button>
        </Flex>
      </Flex>

      <Summary
        totalExpense={totalExpense}
        totalIncome={totalIncome}
        isOpen={isOpen}
        onClose={onClose}
      />

      <Flex
        w="full"
        alignItems={"flex-start"}
        justifyContent={"space-evenly"}
        flexDirection={["column", "column", "column", "row", "row"]}
      >
        <ExpenseView data={allTransactions.filter((item)=> item.type ==="expense")} type={"expense"} />
        <ExpenseView data={allTransactions.filter((item)=> item.type === "income")} type={"income"} />
      </Flex>
    </Flex>
  );
}
