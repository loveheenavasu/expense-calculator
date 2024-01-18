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
  HStack,
} from "@chakra-ui/react";
import React from "react";
import { MdDelete, MdEdit } from "react-icons/md";
import { IncomeFormData } from "@/types/Income";
import { useAppDispatch } from "@/hooks/dispatchSelectHook";
import { deleteIncomeById } from "@/services/slices/expense-trackerSlice";
import { IncomeModal } from "../Modal/IncomeModal";

export const IncomeTable = ({ incomeData }: any) => {
  const toast = useToast();
  const dispatch = useAppDispatch();
  const [incomeModal,setIncomeModal]=React.useState(false);
  const [editId,setEditId]=React.useState<number>(0);
  const deleteHandler = (id: number) => {
    dispatch(deleteIncomeById(id));
    toast({
      position: "top-right",
      description: "Income deleted Sucessfully.",
      status: "success",
      duration: 2000,
      isClosable: true,
    });
  };
  const editHandler=(id:number)=>{
    setEditId(id);
    setIncomeModal(true);
  }
  return (
    <Stack m={"1rem"} border="1px solid gray" borderRadius=".25rem">
      {incomeModal&&<IncomeModal isOpen={incomeModal} setIsOpen={setIncomeModal} editId={editId}/>}
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
                  <Td>{income.amount}</Td>
                  <Td>{convertYMDtoDMY(income.receivedDate)}</Td>
                  <Td>{income.category}</Td>
                  <Td>{income.description}</Td>
                  <Td>
                    {
                      <HStack>
                      <IconButton
                        colorScheme="blue"
                        aria-label="Search database"
                        icon={<MdDelete />}
                        size={"sm"}
                        onClick={() => deleteHandler(income?.id)}
                      />
                      <IconButton
                        colorScheme="blue"
                        aria-label="Search database"
                        icon={<MdEdit />}
                        size={"sm"}
                        onClick={() => editHandler(income?.id)}
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
