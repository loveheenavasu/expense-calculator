import { Box, HStack } from "@chakra-ui/react";
import React, { ReactElement, memo } from "react";
import SimpleSidebar from "../SideBar";

interface props {
  children: ReactElement;
  skipAuthCheck?: boolean;
}
const Layout = ({ children, skipAuthCheck = false }: props) => {
  return (
    //   <Navbar />
    <HStack
      justifyContent={"center"}
      backgroundColor={"white"}
      alignItems={"unset"}
      height={{
        base: `calc(100vh - 150px)`,
        sm: `calc(100vh - 150px)`,
        lg: `calc(100vh - 115px)`,
      }}
      width={"100%"}
    >
      <Box display={{ base: "none", sm: "none", md: "none", lg: "block" }}>
        <SimpleSidebar />
      </Box>
      <Box minWidth={{ base: "unset", sm: "unset", lg: 760 }}>{children}</Box>
    </HStack>
  );
};

export default Layout;
