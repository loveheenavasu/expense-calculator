import { Stack, HStack, Icon,Text} from '@chakra-ui/react'
import React from 'react'
import { GiCash } from 'react-icons/gi'
import { IoWallet, IoCashOutline } from 'react-icons/io5'

type OverviewProps = {
    totalIncome:number;
    totalExpenses:number;
}

export const OverviewTotal = ({totalIncome,totalExpenses}:OverviewProps) => {
  return (
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
                    {totalIncome - totalExpenses}
                  </Text>
                </Stack>
              </Stack>
  )
}
