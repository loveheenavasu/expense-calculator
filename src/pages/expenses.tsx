import {ExpensesModal} from "@/components/Modal/ExpensesModal";
import { SimpleSidebar,getRouteText } from "@/components/SideBar";
import { useAppSelector } from "@/hooks/dispatchSelectHook";
import { RootState } from "@/services/redux-store/store";
import { Divider, Stack, Text } from "@chakra-ui/react";
import React, { useState } from "react";
import { useRouter } from "next/router";
import { NoDataFound } from "@/components/common/No-Data-Found";
import { ExpenseTable } from "@/components/Table/Expenses-Table";
import { ExpenseTotalHeader } from "@/components/Expense-Total-Header";

function Expenses() {
  const [expensesModalOpen, setExpensesModal] = useState(false);
  const route = useRouter();
  const routePath = getRouteText(route.pathname);
  const expenseData = useAppSelector(
    (state: RootState) => state.expenses.expenses
  );
  return (
    <>
      <Stack h={"100vh"} w={"100vw"} bg={"#0d1325"}>
        <SimpleSidebar />
        <Stack ml={{ sm: "none", base: "none", md: "9.5rem", lg: "9.5rem" }}>
          <Text
            ml={"1rem"}
            fontWeight={"600"}
            color={"white"}
            display={{ base: "none", sm: "none", md: "block", lg: "block" }}
            fontSize="2rem"
          >
            {routePath}
          </Text>
          <Divider
            color={"white"}
            width={{ base: "90vw", sm: "90vw", md: "70vw", lg: "98%" }}
            ml={".5rem"}
          />
          {expensesModalOpen && (
            <ExpensesModal
              isOpen={expensesModalOpen}
              setIsOpen={setExpensesModal}
            />
          )}
          <ExpenseTotalHeader
            expenseModalOpen={expensesModalOpen}
            setExpenseModal={setExpensesModal}
            expenseData={expenseData}
          />
          {expenseData.length > 0 ? (
            <ExpenseTable expenseData={expenseData} />
          ) : (
            <NoDataFound />
          )}
        </Stack>
      </Stack>
    </>
  );
}

export default Expenses;
