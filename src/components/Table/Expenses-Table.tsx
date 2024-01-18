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
  HStack,
} from "@chakra-ui/react";
import React, { useState } from "react";
import { MdDelete } from "react-icons/md";
import { MdEdit } from "react-icons/md";
import { ExpenseFormData } from "@/types/Expense";
import { useAppDispatch } from "@/hooks/dispatchSelectHook";
import { deleteExpenseById } from "@/services/slices/expense-trackerSlice";
import { ExpensesModal } from "../Modal/ExpensesModal";

export const ExpenseTable = ({ expenseData }: any) => {
  const [expenseModal,setExpenseModal]=useState(false);
  const [editId,setEditId]=useState<number>(0);
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
  const editHandler=(id:number)=>{
    setEditId(id);
    setExpenseModal(true);
  }
  return (
    <Stack
      m={"1rem"}
      border="1px solid"
      borderRadius=".25rem"
      color="white"
      borderColor="GrayText"
    >
      {expenseModal&&<ExpensesModal isOpen={expenseModal} setIsOpen={setExpenseModal} editId={editId}/>}
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
                      <HStack>
                      <IconButton
                        colorScheme="blue"
                        aria-label="Search database"
                        icon={<MdDelete />}
                        size={"sm"}
                        onClick={() => deleteHandler(expense.id)}
                      />
                      <IconButton
                        colorScheme="blue"
                        aria-label="Search database"
                        icon={<MdEdit />}
                        size={"sm"}
                        onClick={() => editHandler(expense.id)}
                      />
                      </HStack>
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
