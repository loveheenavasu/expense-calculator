import ExpensesModal from "@/components/modal/expenses";
import Navbar from "@/components/navbar";
import SimpleSidebar from "@/components/sidebar";
import { useAppDispatch, useAppSelector } from "@/hooks/dispatchSelectHook";
import { RootState } from "@/services/redux-store/store";
import { deleteExpenseById } from "@/services/slices/expense-trackerSlice";
import {
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
} from "@chakra-ui/react";
import React, { ReactElement, useState } from "react";
import { IoIosAddCircle } from "react-icons/io";
import { MdModeEdit } from "react-icons/md";

function Expenses() {
  const [expensesModalOpen, setExpensesModal] = useState(false);
  const dispatch=useAppDispatch();
  const expenseData = useAppSelector((state: RootState) =>state.expenses.expenses)
const deleteHandler=(id:string)=>{
dispatch(deleteExpenseById(id))
}
  const totalExpenses = expenseData.reduce(
    (total, expense) => total + Number(expense.price),
    0
  );

  return (
    <>
      <Stack
        h={"100vh"}
        w={{ sm: "100vw", base: "100vw", md: "90vw", lg: "90vw" }}
      >
        <SimpleSidebar />
        {expensesModalOpen && (
          <ExpensesModal
            isOpen={expensesModalOpen}
            setIsOpen={setExpensesModal}
          />
        )}

        <Stack
          w={{ sm: "100vw", base: "100vw", md: "90vw", lg: "90vw" }}
          ml={{ sm: "none", base: "none", md: "3rem", lg: "3rem" }}
        >
          <Navbar title="Expenses" />
          <Text m={"1rem"}>Summary</Text>
          <Stack
            m={"1rem"}
            direction={{ base: "column", sm: "column", md: "row", lg: "row" }}
          >
            <Stack
              border={"1px solid black"}
              borderRadius={"8px"}
              minWidth={"310px"}
              padding={"8px"}
            >
              <Text>Total expenses</Text>
              <Text>{expenseData.length}</Text>
            </Stack>
            <Stack
              border={"1px solid black"}
              borderRadius={"8px"}
              minWidth={"310px"}
              padding={"8px"}
            >
              <Text> Total Amount</Text>
              <Text> {totalExpenses}</Text>
            </Stack>
            <IconButton
              colorScheme="blue"
              aria-label="Search database"
              icon={<IoIosAddCircle />}
              size={"lg"}
              onClick={() => setExpensesModal(!expensesModalOpen)}
            />
          </Stack>
          {expenseData.length>0?(
            <Stack m={"1rem"} border="1px solid gray" borderRadius=".25rem">
            <TableContainer>
              <Table variant="simple">
                <Thead>
                  <Tr>
                    <Th>Name</Th>
                    <Th>Price</Th>
                    <Th>Spend Date</Th>
                    <Th>Category</Th>
                    <Th>Paid via</Th>
                    <Th>Description</Th>
                    <Th>Actions</Th>
                  </Tr>
                </Thead>
                <Tbody>
                  {expenseData.map((expense: any) => {
                    return (
                      <Tr key={expense.id}>
                        <Td>{expense.name_type}</Td>
                        <Td>{expense.price}</Td>
                        <Td>{expense.spendDate}</Td>
                        <Td>{expense.category}</Td>
                        <Td>{expense.paidVia}</Td>
                        <Td>{expense.description}</Td>
                        <Td>
                        {(
                          <IconButton
                            colorScheme="blue"
                            aria-label="Search database"
                            icon={<MdModeEdit />}
                            size={"sm"}
                            onClick={()=>deleteHandler(expense.id)}
                          />
                        )}
                        </Td>
                      </Tr>
                    );
                  })}
                </Tbody>
              </Table>
            </TableContainer>
          </Stack>
          ):<>
          <Text fontSize={'2rem'} fontWeight={'bold'} align={'center'}>No data Found</Text>
          </>}
        </Stack>
      </Stack>
    </>
  );
}

export default Expenses;
