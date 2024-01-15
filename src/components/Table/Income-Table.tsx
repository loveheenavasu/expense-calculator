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
  useToast,
} from "@chakra-ui/react";
import React from "react";
import { MdDelete } from "react-icons/md";
import { IncomeFormData } from "../../types";
import { useAppDispatch } from "@/hooks/dispatchSelectHook";
import { deleteIncomeById } from "@/services/slices/expense-trackerSlice";

export const IncomeTable = ({ incomeData }: any) => {
  const toast = useToast();
  const dispatch = useAppDispatch();
  const deleteHandler = (id: string) => {
    dispatch(deleteIncomeById(id));
    toast({
      position: "top-right",
      description: "Income deleted Sucessfully.",
      status: "success",
      duration: 2000,
      isClosable: true,
    });
  };
  return (
    <Stack m={"1rem"} border="1px solid gray" borderRadius=".25rem">
      <TableContainer style={{ overflow: "auto", maxHeight: "500px" }}>
        <Table variant="simple" border={"1px solid"} borderColor="GrayText">
          <Thead bg="#253669" color="#FFFFFF">
            <Tr>
              <Th color="#FFFFFF">Name</Th>
              <Th color="#FFFFFF">Amount</Th>
              <Th color="#FFFFFF">Received Date</Th>
              <Th color="#FFFFFF">Category</Th>
              <Th color="#FFFFFF">Description</Th>
              <Th color="#FFFFFF">Actions</Th>
            </Tr>
          </Thead>
          <Tbody>
            {incomeData.map((income: IncomeFormData) => {
              return (
                <Tr
                  key={income.id}
                  borderColor="GrayText"
                  borderBottom={"1px solid green"}
                >
                  <Td>{income.name_type}</Td>
                  <Td>
                    {income.amount && income.amount > 0 ? (
                      <span>{income.amount}</span>
                    ) : (
                      <span>{}</span>
                    )}
                  </Td>
                  <Td>{convertYMDtoDMY(income.receivedDate)}</Td>
                  <Td>{income.category}</Td>
                  <Td>{income.description}</Td>
                  <Td>
                    {
                      <IconButton
                        colorScheme="blue"
                        aria-label="remove button"
                        icon={<MdDelete />}
                        size="sm"
                        onClick={() => deleteHandler(income.id)}
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
