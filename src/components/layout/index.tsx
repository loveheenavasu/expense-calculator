import { Box, HStack } from "@chakra-ui/react";
import React, { ReactElement, memo } from "react";
import SimpleSidebar from "../sidebar";
// import Navbar from "./Navbar";
// import LeftSidebar from "./LeftSidebar";
// import RightSidebar from "./RightSidebar";
// import AuthProvider from "../IsAuthenticated";
// const MemoizedLeftSidebar = React.memo(LeftSidebar);
// const MemoizedRightSidebar = React.memo(RightSidebar);
interface props {
  children: ReactElement;
  skipAuthCheck?: boolean;
}
const Layout = ({ children, skipAuthCheck = false }: props) => {
  return (
    // <AuthProvider skipAuthCheck={skipAuthCheck}>
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
          {/* <MemoizedLeftSidebar /> */}
          <SimpleSidebar/>
        </Box>
        <Box minWidth={{ base: "unset", sm: "unset", lg: 760 }}>{children}</Box>
        {/* <Box display={{ base: "none", sm: "none", md: "none", lg: "block" }}>
          {<MemoizedRightSidebar />}
        </Box> */}
      </HStack>
    // </AuthProvider>
  );
};

export default Layout;
