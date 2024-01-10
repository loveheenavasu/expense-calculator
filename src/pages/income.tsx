import IncomeModal from "@/components/modal/income";
import Navbar from "@/components/navbar";
import SimpleSidebar from "@/components/sidebar";
import { useAppDispatch, useAppSelector } from "@/hooks/dispatchSelectHook";
import { RootState } from "@/services/redux-store/store";
import { deleteIncomeById } from "@/services/slices/expense-trackerSlice";
import {
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
import { VscAdd } from "react-icons/vsc";
import { MdDelete } from "react-icons/md";

function Income() {
  const [isIncomeModalOpen, setIncomeModal] = useState(false);
  const dispatch = useAppDispatch();
  const incomeData = useAppSelector((state: RootState) =>state.expenses.income
);
  const deleteHandler = (id: string) => {
    dispatch(deleteIncomeById(id));
  };
  const totalIncome = incomeData.reduce(
    (total, income) => total + Number(income.amount),
    0
  );

  return (
    <>
      <Stack
        h={"100vh"}
        w={'100vw'}
      >
        <SimpleSidebar />
        {isIncomeModalOpen && (
          <IncomeModal isOpen={isIncomeModalOpen} setIsOpen={setIncomeModal} />
        )}
        <Stack
          w={{ sm: "100vw", base: "100vw", md: "90vw", lg: "90vw" }}
          ml={{ sm: "none", base: "none", md: "9.5rem", lg: "9.5rem" }}
        >
          <Text m={"1.5rem"} fontWeight={'600'}>Summary</Text>
          <Stack
            m={"1rem"}
            direction={{ base: "column", sm: "column", md: "row", lg: "row" }}
          >
            <Stack
              minWidth={"310px"}
              padding={"8px"}
              border={"1px solid black"}
              borderRadius={"8px"}
            >
              <Text fontSize={"1rem"}  color={'#8A94A6'}>
                Total Income
              </Text>
              <Text fontWeight={'bold'} color={'gray'} fontSize='2rem'>{incomeData.length}</Text>
            </Stack>
            <Stack
             border={"1px solid black"}
             borderRadius={"8px"}
              minWidth={"310px"}
              padding={"8px"}
            >
              <Text fontSize={"1rem"}  color={'#8A94A6'}>
                {" "}
                Total Amount
              </Text>
              <Text fontWeight={'bold'} color={'gray'} fontSize='2rem'> {totalIncome}</Text>
            </Stack>
            <IconButton
              colorScheme="blue"
              aria-label="Search database"
              icon={<VscAdd/>}
              size={"lg"}
              onClick={() => setIncomeModal(!isIncomeModalOpen)}
            />
          </Stack>
          {incomeData.length>0?(
            <Stack m={"1rem"} border="1px solid gray" borderRadius=".25rem">
            <TableContainer>
            <Table variant="simple">
              <Thead>
                <Tr>
                  <Th>Name</Th>
                  <Th>Amount</Th>
                  <Th>Received Date</Th>
                  <Th>Category</Th>
                  <Th>Description</Th>
                </Tr>
              </Thead>
              <Tbody>
                {incomeData.map((income: any) => {
                  return (
                    <Tr key={income.id}>
                      <Td>{income.name_type}</Td>
                      <Td>
                        {income.amount && income.amount > 0 ? (
                          <span>{income.amount}</span>
                        ) : (
                          <span>{}</span>
                        )}
                      </Td>
                      <Td>{income.receivedDate}</Td>
                      <Td>{income.category}</Td>
                      <Td>{income.description}</Td>
                      <Td>
                        {
                          <IconButton
                            colorScheme="blue"
                            aria-label="Search database"
                            icon={<MdDelete />}
                            size={"sm"}
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
          ):(
            <>
            <Text fontSize={'2rem'} fontWeight={'bold'} align={'center'}>No data Found</Text>
            </>
          )}
        </Stack>
      </Stack>
    </>
  );
}
export default Income;
