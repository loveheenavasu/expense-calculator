import IncomeModal from "@/components/modal/income";
import Navbar from "@/components/navbar";
import SimpleSidebar, { getRouteText } from "@/components/sidebar";
import { useAppDispatch, useAppSelector } from "@/hooks/dispatchSelectHook";
import { RootState } from "@/services/redux-store/store";
import { deleteIncomeById } from "@/services/slices/expense-trackerSlice";
import {
  Divider,
  IconButton,
  Stack,
  Table,
  TableContainer,
  Tbody,
  Td,
  Text,
  Th,
  Thead,
  Tr,useToast
} from "@chakra-ui/react";
import React, { ReactElement, useState } from "react";
import { VscAdd } from "react-icons/vsc";
import { MdDelete } from "react-icons/md";
import { useRouter } from "next/router";

function Income() {
  const [isIncomeModalOpen, setIncomeModal] = useState(false);
  const dispatch = useAppDispatch();
  const route=useRouter();
  const toast=useToast();
  const routePath=getRouteText(route.pathname)
  const incomeData = useAppSelector((state: RootState) =>state.expenses.income
);
  const deleteHandler = (id: string) => {
    dispatch(deleteIncomeById(id));
    toast({
      position:'top-right',
      description: "Income deleted Sucessfully.",
      status: 'warning',
      duration: 2000,
      isClosable: true,
    })
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
        bg='black'
        color='white'
      >
        <SimpleSidebar />
        {isIncomeModalOpen && (
          <IncomeModal isOpen={isIncomeModalOpen} setIsOpen={setIncomeModal} />
        )}
        <Stack
          w={{ sm: "100vw", base: "100vw", md: "90vw", lg: "90vw" }}
          ml={{ sm: "none", base: "none", md: "9.5rem", lg: "9.5rem" }}
        >
          <Text ml={"1rem"} fontWeight={'600'} display={{base:'none',sm:'none',md:'block',lg:'block'}} fontSize='2rem'>{routePath}</Text>
          <Divider color={'white'} width={'80vw'} ml={'1rem'}/>
          <Stack
            m={"1rem"}
            direction={{ base: "column", sm: "column", md: "row", lg: "row" }}
          >
            <Stack
              minWidth={"310px"}
              padding={"8px"}
              border={"1px solid gray"}
              borderRadius={"8px"}
            >
              <Text fontSize={"1rem"}  color={'#8A94A6'}>
                Total Income
              </Text>
              <Text fontWeight={'bold'} fontSize='1.5rem'>{incomeData.length}</Text>
            </Stack>
            <Stack
             border={"1px solid gray"}
             borderRadius={"8px"}
              minWidth={"310px"}
              padding={"8px"}
            >
              <Text fontSize={"1rem"}  color={'#8A94A6'}>
                {" "}
                Total Amount
              </Text>
              <Text fontWeight={'bold'}  fontSize='1.5rem'>&#8377; {totalIncome}</Text>
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
            <Stack m={"1rem"} border="1px solid gray" borderRadius=".25rem" >
            <TableContainer>
            <Table variant="simple" border={'1px solid'} borderColor='GrayText'>
              <Thead bg='#27272a' color='#FFFFFF'>
                <Tr>
                  <Th color='#FFFFFF'>Name</Th>
                  <Th color='#FFFFFF'>Amount</Th>
                  <Th color='#FFFFFF'>Received Date</Th>
                  <Th color='#FFFFFF'>Category</Th>
                  <Th color='#FFFFFF'>Description</Th>
                  <Th color='#FFFFFF'>Actions</Th>
                </Tr>
              </Thead>
              <Tbody>
                {incomeData.map((income: any) => {
                  return (
                    <Tr key={income.id} borderColor='GrayText' borderBottom={'1px solid green'}>
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
