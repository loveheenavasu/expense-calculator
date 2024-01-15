import { Stack, IconButton, Text } from "@chakra-ui/react";
import React from "react";
import { VscAdd } from "react-icons/vsc";
import { IncomeProps } from "../../types/Income";
import { CustomButton } from "../common/Button";
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
      direction={{ base: "column", sm: "column", md: "column", lg: "row" }}
      justifyContent={"space-between"}
    >
      <Stack
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
      </Stack>
      <Stack mr={{ lg: "1rem" }}>
          <CustomButton
            onClick={() => setIncomeModal(!incomeModalOpen)}
            type="submit"
            fontSize={""}
            bg="#3182ce"
            color="white"
          >
            Add Income
          </CustomButton>
        </Stack>
    </Stack>
  );
};
