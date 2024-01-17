import { Box, HStack, Stack } from "@chakra-ui/react";
import React, { ReactElement, memo } from "react";
import SimpleSidebar from "../SideBar";

interface props {
  children: ReactElement;
  skipAuthCheck?: boolean;
}
const MainLayout = ({ children, skipAuthCheck = false }: props) => {
  return (
    <Stack h={"100vh"} w={"100vw"} bg={"#0d1325"}>
      <SimpleSidebar/>
          {children}
        </Stack>
  );
};

export default MainLayout;
