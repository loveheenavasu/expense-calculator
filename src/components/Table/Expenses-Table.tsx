import { convertYMDtoDMY } from "@/utils/dateFormatter";
import {
  Stack,
  TableContainer,
  Table,
  Thead,
  Tr,
  Th,
  Tbody,
  Td,
  IconButton,
  Text,
  useToast,
} from "@chakra-ui/react";
import React from "react";
import { MdDelete } from "react-icons/md";
import { ExpenseFormData } from "@/types/Expense";
import { useAppDispatch } from "@/hooks/dispatchSelectHook";
import { deleteExpenseById } from "@/services/slices/expense-trackerSlice";

export const ExpenseTable = ({ expenseData }: any) => {
  const toast = useToast();
  const dispatch = useAppDispatch();
  const deleteHandler = (id: number) => {
    dispatch(deleteExpenseById(id));
    toast({
      position: "top-right",
      description: "Expense deleted Sucessfully.",
      status: "success",
      duration: 2000,
      isClosable: true,
    });
  };
  return (
    <Stack
      m={"1rem"}
      border="1px solid"
      borderRadius=".25rem"
      color="white"
      borderColor="GrayText"
    >
      <TableContainer style={{ overflow: "auto", maxHeight: "500px" }}>
        <Table variant="simple" border={"1px solid"} borderColor="GrayText">
          <Thead bg="#253669">
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
          <Tbody style={{ maxHeight: "500px", overflow: "auto" }}>
            {expenseData.map((expense: ExpenseFormData) => {
              return (
                <Tr key={expense.id} border="yellow">
                  <Td>
                    <Text color={"#FFFFFF"}>{expense.name_type}</Text>
                  </Td>
                  <Td>
                    <Text color={"#FFFFFF"}>{expense.price}</Text>
                  </Td>
                  <Td>
                    <Text color={"#FFFFFF"}>
                      {convertYMDtoDMY(expense.spendDate)}
                    </Text>
                  </Td>
                  <Td>
                    <Text color={"#FFFFFF"}>{expense.category}</Text>
                  </Td>
                  <Td>
                    <Text color={"#FFFFFF"}>{expense.paidVia}</Text>
                  </Td>
                  <Td>
                    <Text color={"#FFFFFF"}>{expense.description}</Text>
                  </Td>
                  <Td align="center" justifyContent={"center"}>
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
  );
};
