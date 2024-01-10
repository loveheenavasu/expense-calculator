import ExpensesModal from "@/components/modal/expenses";
import Navbar from "@/components/navbar";
import SimpleSidebar, { getRouteText } from "@/components/sidebar";
import { useAppDispatch, useAppSelector } from "@/hooks/dispatchSelectHook";
import { RootState } from "@/services/redux-store/store";
import { deleteExpenseById } from "@/services/slices/expense-trackerSlice";
import {
  Divider,
  HStack,
  IconButton,
  Stack,
  Table,
  TableContainer,
  Tbody,
  Td,
  Text,
  Th,
  Thead,
  Tr,
  useToast,
} from "@chakra-ui/react";
import React, { ReactElement, useState } from "react";
import { VscAdd } from "react-icons/vsc";
import { MdDelete } from "react-icons/md";
import { useRouter } from "next/router";

function Expenses() {
  const [expensesModalOpen, setExpensesModal] = useState(false);
  const dispatch = useAppDispatch();
  const route = useRouter();
  const toast = useToast();
  const routePath = getRouteText(route.pathname);
  const expenseData = useAppSelector(
    (state: RootState) => state.expenses.expenses
  );
  const deleteHandler = (id: string) => {
    dispatch(deleteExpenseById(id));
    toast({
      position: "top-right",
      description: "Expense deleted Sucessfully.",
      status: "warning",
      duration: 2000,
      isClosable: true,
    });
  };
  const totalExpenses = expenseData.reduce(
    (total, expense) => total + Number(expense.price),
    0
  );

  return (
    <>
      <Stack h={"100vh"} w={"100vw"} bg={"black"}>
        <SimpleSidebar />
        {expensesModalOpen && (
          <ExpensesModal
            isOpen={expensesModalOpen}
            setIsOpen={setExpensesModal}
          />
        )}

        <Stack
          w={{ sm: "100vw", base: "100vw", md: "90vw", lg: "90vw" }}
          ml={{ sm: "none", base: "none", md: "9.5rem", lg: "9.5rem" }}
          h={'100vh'}
        >
          <Text
            ml={"1rem"}
            fontWeight={"600"}
            color={"white"}
            display={{ base: "none", sm: "none", md: "block", lg: "block" }}
            fontSize="2rem"
          >
            {routePath}
          </Text>
          <Divider color={"white"} width={"80vw"} ml={"1rem"} />
          <Stack
            m={"1rem"}
            direction={{ base: "column", sm: "column", md: "row", lg: "row" }}
          >
            <Stack
              border={"1px solid gray"}
              borderRadius={"8px"}
              minWidth={"310px"}
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
              minWidth={"310px"}
              padding={"8px"}
            >
              <Text color={"#8A94A6"}> Total Amount</Text>
              <Text fontWeight={"bold"} color={"white"} fontSize="1.5rem">
                &#8377; {totalExpenses}
              </Text>
            </Stack>
            <IconButton
              colorScheme="blue"
              aria-label="Search database"
              icon={<VscAdd />}
              size={"md"}
              onClick={() => setExpensesModal(!expensesModalOpen)}
            />
          </Stack>
          {expenseData.length > 0 ? (
            <Stack
              m={"1rem"}
              border="1px solid"
              borderRadius=".25rem"
              color="white"
              borderColor="GrayText"
            >
              <TableContainer>
                <Table variant="simple" border={'1px solid'} borderColor='GrayText'>
                  <Thead bg="#27272a">
                    <Tr>
                      <Th color={"white"}>Name</Th>
                      <Th color={"white"}>Price</Th>
                      <Th color={"white"}>Spend Date</Th>
                      <Th color={"white"}>Category</Th>
                      <Th color={"white"}>Paid via</Th>
                      <Th color={"white"}>Description</Th>
                      <Th color={"white"}>Actions</Th>
                    </Tr>
                  </Thead>
                  <Tbody>
                    {expenseData.map((expense: any) => {
                      return (
                        <Tr key={expense.id} border='yellow'>
                          <Td><Text color={'#FFFFFF'}>{expense.name_type}</Text></Td>
                          <Td><Text color={'#FFFFFF'}>{expense.price}</Text></Td>
                          <Td><Text color={'#FFFFFF'}>{expense.spendDate}</Text></Td>
                          <Td><Text color={'#FFFFFF'}>{expense.category}</Text></Td>
                          <Td><Text color={'#FFFFFF'}>{expense.paidVia}</Text></Td>
                          <Td><Text color={'#FFFFFF'}>{expense.description}</Text></Td>
                          <Td>
                            {
                              <IconButton
                                colorScheme="blue"
                                aria-label="Search database"
                                icon={<MdDelete />}
                                size={"sm"}
                                onClick={() => deleteHandler(expense.id)}
                              />
                            }
                          </Td>
                        </Tr>
                      );
                    })}
                  </Tbody>
                </Table>
              </TableContainer>
            </Stack>
          ) : (
              <Text
                fontSize={"2rem"}
                fontWeight={"bold"}
                align={"center"}
                color="white"
              >
                No data Found
              </Text>
          )}
        </Stack>
      </Stack>
    </>
  );
}

export default Expenses;
