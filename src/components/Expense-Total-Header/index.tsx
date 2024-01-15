import { Stack, IconButton, Text, Button } from "@chakra-ui/react";
import React from "react";
import { VscAdd } from "react-icons/vsc";
import { ExpenseProps } from "../../types/Expense";
import { CustomButton } from "../common/Button";

export const ExpenseTotalHeader = ({
  expenseModalOpen,
  setExpenseModal,
  expenseData,
}: ExpenseProps) => {
  const totalExpenses = expenseData.reduce(
    (total: number, expense: { price: any }) => total + Number(expense.price),
    0
  );
  return (
    <Stack
      m={"1rem"}
      direction={{ base: "column", sm: "column", md: "row", lg: "row" }}
    >
      <Stack
        border={"1px solid gray"}
        borderRadius={"8px"}
        width={{ base: "unset", md: "310px", lg: "310px" }}
        padding={"8px"}
      >
        <Text color={"#8A94A6"}>Total expenses</Text>
        <Text fontWeight={"bold"} color={"white"} fontSize="1.5rem">
          {expenseData.length}
        </Text>
      </Stack>
      <Stack
        border={"1px solid gray"}
        borderRadius={"8px"}
        width={{ base: "unset", md: "310px", lg: "310px" }}
        padding={"8px"}
      >
        <Text color={"#8A94A6"}> Total Amount</Text>
        <Text fontWeight={"bold"} color={"white"} fontSize="1.5rem">
          &#8377; {totalExpenses}
        </Text>
      </Stack>
      <Stack alignItems={"center"} justifyContent={"center"} alignSelf={'flex-end'} justifySelf={'flex-end'}>
        <CustomButton
          onClick={() => setExpenseModal(!expenseModalOpen)}
          type="submit"
          fontSize={""}
          bg="#3182ce"
          color="white"
        >
          Add Expense
        </CustomButton>
      </Stack>
    </Stack>
  );
};
