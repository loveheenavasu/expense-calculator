import { Stack, IconButton, Text } from "@chakra-ui/react";
import React from "react";
import { VscAdd } from "react-icons/vsc";
import { IncomeProps } from "../../types/Income";
export const IncomeTotalHeader = ({
  incomeModalOpen,
  setIncomeModal,
  incomeData,
}: IncomeProps) => {
  const totalIncome = incomeData.reduce(
    (total: number, income: { amount: number }) =>
      total + Number(income.amount),
    0
  );
  return (
    <Stack
      m={"1rem"}
      direction={{ base: "column", sm: "column", md: "row", lg: "row" }}
    >
      <Stack
        width={{ base: "unset", md: "310px", lg: "310px" }}
        padding={"8px"}
        border={"1px solid gray"}
        borderRadius={"8px"}
      >
        <Text fontSize={"1rem"} color={"#8A94A6"}>
          Total Income
        </Text>
        <Text fontWeight={"bold"} fontSize="1.5rem">
          {incomeData.length}
        </Text>
      </Stack>
      <Stack
        border={"1px solid gray"}
        borderRadius={"8px"}
        width={{ base: "unset", md: "310px", lg: "310px" }}
        padding={"8px"}
      >
        <Text fontSize={"1rem"} color={"#8A94A6"}>
          {" "}
          Total Amount
        </Text>
        <Text fontWeight={"bold"} fontSize="1.5rem">
          &#8377; {totalIncome}
        </Text>
      </Stack>
      <IconButton
        colorScheme="blue"
        aria-label="Search database"
        icon={<VscAdd />}
        size="md"
        w={{ sm: "200px", md: "unset", lg: "unset" }}
        onClick={() => setIncomeModal(!incomeModalOpen)}
      />
    </Stack>
  );
};
