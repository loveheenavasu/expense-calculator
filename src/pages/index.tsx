import Head from "next/head";
import styles from "@/styles/Home.module.css";
import { Stack, Text, HStack, Icon, Divider, Box } from "@chakra-ui/react";
import { useAppSelector } from "@/hooks/dispatchSelectHook";
import { RootState } from "@/services/redux-store/store";
import SimpleSidebar from "@/components/SideBar";
import Navbar from "@/components/navbar";
import { GiCash } from "react-icons/gi";
import { IoCashOutline } from "react-icons/io5";
import { IoWallet } from "react-icons/io5";
import { BarChart } from "@/components/Overview-Chart/Barchart";
import { DoughnutChart } from "@/components/Overview-Chart/Doughnut-chart";
export default function Home() {
  const incomeData = useAppSelector(
    (state: RootState) => state.expenses.income
  );
  const expenseData = useAppSelector(
    (state: RootState) => state.expenses.expenses
  );
  const totalIncome = incomeData.reduce(
    (total, income) => total + Number(income.amount),
    0
  );
  const totalExpenses = expenseData.reduce(
    (total, expense) => total + Number(expense.price),
    0
  );
  const totalAvailableBalance = totalIncome - totalExpenses;
  return (
    <>
      <Head>
        <title>Expense Tracker</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main>
        <Stack h={"100vh"} bg={"#0d1325"} color={"white"} w={"100vw"}>
          <SimpleSidebar />
          <Stack ml={{ sm: "none", base: "none", md: "9.5rem", lg: "9.5rem" }}>
            <Navbar title="Overview" />
            <Divider
              color={"white"}
              width={{ base: "95%", sm: "90vw", md: "70vw", lg: "80vw" }}
              ml={"1rem"}
            />
            <Stack
              direction={{
                base: "column",
                sm: "column",
                md: "row",
                lg: "row",
              }}
              wrap={"wrap"}
              bg={"#0d1325"}
            >
              <Stack
                m={"1rem"}
                width={"95%"}
                direction={{
                  base: "column",
                  sm: "column",
                  md: "row",
                  lg: "row",
                }}
              >
                <Stack
                  border={"1px solid gray"}
                  borderRadius={"8px"}
                  width={{ base: "unset", md: "180px", xl: "310px" }}
                  padding={"8px"}
                >
                  <HStack justifyContent={"space-between"}>
                    <Text color={"#8A94A6"}>Total Income</Text>
                    <Icon as={IoWallet} />
                  </HStack>
                  <Text fontWeight={"bold"} fontSize="1.5rem">
                    &#8377; {totalIncome}
                  </Text>
                </Stack>
                <Stack
                  width={{ base: "unset", md: "180px", xl: "310px" }}
                  padding={"8px"}
                  border={"1px solid gray"}
                  borderRadius={"8px"}
                >
                  <HStack justifyContent="space-between">
                    <Text
                      fontSize={"1rem"}
                      fontWeight={"700"}
                      color={"#8A94A6"}
                    >
                      Total Spent
                    </Text>
                    <Icon as={IoCashOutline} />
                  </HStack>
                  <Text fontWeight={"bold"} fontSize="1.5rem">
                    &#8377; {totalExpenses}
                  </Text>
                </Stack>
                <Stack
                  width={{ base: "unset", md: "180px", xl: "310px" }}
                  padding={"8px"}
                  border={"1px solid gray"}
                  borderRadius={"8px"}
                >
                  <HStack justifyContent={"space-between"}>
                    <Text
                      fontSize={"1rem"}
                      fontWeight={"700"}
                      color={"#8A94A6"}
                    >
                      Available balance
                    </Text>
                    <Icon as={GiCash} />
                  </HStack>
                  <Text fontWeight={"bold"} fontSize="1.5rem">
                    &#8377;{" "}
                    {totalIncome > totalExpenses
                      ? totalIncome - totalExpenses
                      : 0}
                  </Text>
                </Stack>
              </Stack>
              <Stack
                width={"95%"}
                direction={{ base: "column", md: "column", lg: "row" }}
                m={"1rem"}
              >
                <Stack
                  width={{ base: "98%", md: "none", lg: "50%", xl: "800px" }}
                  h={{ lg: "420px" }}
                  border={"1px solid gray"}
                  borderRadius={"8px"}
                  alignSelf={"flex-end"}
                  alignItems={"center"}
                  mr={"1rem"}
                  padding={".5rem 1rem .5rem"}
                >
                  <Text fontSize={"2rem"}>Summary</Text>
                  {totalExpenses || totalIncome > 0 ? (
                    <Box
                      w={{ base: "none%", md: "80%", lg: "70%" }}
                      height={{ lg: "420px" }}
                      alignItems={"center"}
                    >
                      <BarChart
                        incomeData={incomeData}
                        expenseData={expenseData}
                      />
                    </Box>
                  ) : (
                    <>
                      <Text color={"white"} fontSize={"1rem"} align={"center"}>
                        No data found
                      </Text>
                    </>
                  )}
                </Stack>
                <Stack
                  width={{ base: "98%", md: "none", lg: "50%", xl: "800px" }}
                  h={{ lg: "420px" }}
                  border={"1px solid gray"}
                  borderRadius={"8px"}
                  alignSelf={"flex-end"}
                  alignItems={"center"}
                  mr={"1rem"}
                  padding={".5rem 1rem .5rem"}
                >
                  <Text fontSize={"2rem"}>Summary</Text>
                  {totalExpenses || totalIncome > 0 ? (
                    <Box
                      w={{ base: "100%", md: "80%", lg: "70%" }}
                      height={{ lg: "350px" }}
                      alignItems={"center"}
                      justifyContent="center"
                    >
                      <DoughnutChart
                        totalIncome={totalIncome}
                        totalExpenses={totalExpenses}
                      />
                    </Box>
                  ) : (
                    <>
                      <Text color={"white"} fontSize={"1rem"} align={"center"}>
                        No data found
                      </Text>
                    </>
                  )}
                </Stack>
              </Stack>
            </Stack>
          </Stack>
        </Stack>
      </main>
    </>
  );
}
