import { Box, HStack, Stack } from "@chakra-ui/react";
import React, { ReactElement, memo } from "react";

interface props {
  children: ReactElement;
  skipAuthCheck?: boolean;
}
const MainLayout = ({ children, skipAuthCheck = false }: props) => {
  return (
    <Stack h={"100vh"} w={"100vw"} bg={"#0d1325"}>
          {children}
        </Stack>
  );
};

export default MainLayout;
