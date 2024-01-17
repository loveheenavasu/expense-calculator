import Head from "next/head";
import { Stack, Text, Divider, Box } from "@chakra-ui/react";
import { useAppSelector } from "@/hooks/dispatchSelectHook";
import { RootState } from "@/services/redux-store/store";
import { Sidebar } from "@/components/Side-Navigation-Bar";
import Navbar from "@/components/Navbar";
import { BarChart } from "@/components/Overview-Chart/Barchart";
import { DoughnutChart } from "@/components/Overview-Chart/Doughnut-chart";
import { OverviewTotal } from "@/components/Overview-Total-Header";
export default function Home() {
  const incomeData = useAppSelector(
    (state: RootState) => state.expenses.income
  );
  const expenseData = useAppSelector(
    (state: RootState) => state.expenses.expenses
  );
  const calculateTotalIncomeByMonthArray = () => {
    const cleanedIncomeData = incomeData.map(({ amount, receivedDate }) => ({
      amount,
      receivedDate,
    }));
    const totalIncomeByMonth = Array(12).fill(0);
    cleanedIncomeData.forEach((income: any) => {
      const { amount, receivedDate } = income;
      const month = new Date(receivedDate).getMonth();
      totalIncomeByMonth[month] += amount;
    });

    return totalIncomeByMonth;
  };
  const calculateTotalExpenseByMonth = () => {
    const cleanedIncomeData = expenseData.map(({ price, spendDate }) => ({
      price,
      spendDate,
    }));
    const totalExpenseByMonth = Array(12).fill(0);
    cleanedIncomeData.forEach((income: any) => {
      const { price, spendDate } = income;
      const month = new Date(spendDate).getMonth();
      totalExpenseByMonth[month] += price;
    });

    return totalExpenseByMonth;
  };
  const incomesInMonths = calculateTotalIncomeByMonthArray();
  const ExpensesInMonths = calculateTotalExpenseByMonth();
  const totalIncome = incomeData.reduce(
    (total, income) => total + Number(income.amount),
    0
  );
  const totalExpenses = expenseData.reduce(
    (total, expense) => total + Number(expense.price),
    0
  );
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
          <Sidebar />
          <Stack ml={{ sm: "none", base: "none", md: "9.5rem", lg: "9.5rem" }}>
            <Navbar title="Overview" />
            <Divider
              color={"white"}
              width={{ base: "90vw", sm: "90vw", md: "70vw", lg: "98%" }}
              ml={".5rem"}
            />
            <Stack
              direction={{
                base: "column",
                sm: "column",
                md: "row",
                lg: "row",
              }}
              justifyContent={"center"}
              wrap={"wrap"}
              bg={"#0d1325"}
            >
              <OverviewTotal
                totalExpenses={totalExpenses}
                totalIncome={totalIncome}
              />
              <Stack
                width={"95%"}
                direction={{ base: "column", md: "column", lg: "row" }}
                m={"1rem"}
              >
                <Stack
                  width={{ base: "100%", md: "none", lg: "50%", xl: "800px" }}
                  h={{ lg: "420px" }}
                  border={"1px solid gray"}
                  borderRadius={"8px"}
                  alignSelf={"flex-end"}
                  alignItems={"center"}
                  mr={{ lg: "1rem" }}
                  padding={".5rem 1rem .5rem"}
                >
                  <Text fontSize={"2rem"}>Summary</Text>
                  {totalExpenses || totalIncome > 0 ? (
                    <Box
                      w={{ base: "none", md: "80%", lg: "70%" }}
                      height={{ lg: "420px" }}
                      alignItems={"center"}
                    >
                      <BarChart
                        incomeData={incomesInMonths}
                        expenseData={ExpensesInMonths}
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
                  width={{ base: "100%", md: "none", lg: "50%", xl: "800px" }}
                  h={{ lg: "420px" }}
                  border={"1px solid gray"}
                  borderRadius={"8px"}
                  alignSelf={"flex-end"}
                  alignItems={"center"}
                  mr={{ lg: "1rem" }}
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
