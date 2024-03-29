import { IncomeModal } from "@/components/Modal/IncomeModal";
import { Sidebar } from "@/components/Side-Navigation-Bar";
import { getRouteText } from "@/components/Side-Navigation-Bar";
import { useAppSelector } from "@/hooks/dispatchSelectHook";
import { RootState } from "@/services/redux-store/store";
import { Divider, Stack, Text } from "@chakra-ui/react";
import React, { useState } from "react";
import { useRouter } from "next/router";
import { IncomeTable } from "@/components/Table/Income-Table";
import { NoDataFound } from "@/components/common/No-Data-Found";
import { IncomeTotalHeader } from "@/components/Income-Total-Header";

function Income() {
  const [isIncomeModalOpen, setIncomeModal] = useState(false);
  const route = useRouter();
  const routePath = getRouteText(route.pathname);
  const incomeData = useAppSelector(
    (state: RootState) => state.expenses.income
  );

  return (
    <>
      <Stack h={"100vh"} w={"100vw"} bg="#0d1325" color="white">
        <Sidebar />
        {isIncomeModalOpen && (
          <IncomeModal isOpen={isIncomeModalOpen} setIsOpen={setIncomeModal} />
        )}
        <Stack ml={{ sm: "none", base: "none", md: "9.5rem", lg: "9.5rem" }}>
          <Text
            ml={"1rem"}
            fontWeight={"600"}
            display={{ base: "none", sm: "none", md: "block", lg: "block" }}
            fontSize="2rem"
          >
            {routePath}
          </Text>
          <Divider
            color={"white"}
            width={{ base: "90vw", sm: "90vw", md: "70vw", lg: "98%" }}
            ml={".5rem"}
          />
          <IncomeTotalHeader
            incomeModalOpen={isIncomeModalOpen}
            setIncomeModal={setIncomeModal}
            incomeData={incomeData}
          />
          {incomeData.length > 0 ? (
            <IncomeTable incomeData={incomeData} />
          ) : (
            <NoDataFound />
          )}
        </Stack>
      </Stack>
    </>
  );
}
export default Income;
