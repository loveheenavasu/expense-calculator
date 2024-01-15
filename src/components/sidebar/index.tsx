"use client";

import React from "react";
import {
  IconButton,
  Box,
  CloseButton,
  Flex,
  Icon,
  useColorModeValue,
  Text,
  Drawer,
  DrawerContent,
  useDisclosure,
  BoxProps,
  FlexProps,
  Stack,
  HStack,
} from "@chakra-ui/react";
import {
  FiHome,
  FiTrendingUp,
  FiCompass,
  FiStar,
  FiSettings,
  FiMenu,
} from "react-icons/fi";
import { IoIosWallet } from "react-icons/io";
import { IconType } from "react-icons";
import { ReactText } from "react";
import Link from "next/link";
import { useRouter } from "next/router";

interface LinkItemProps {
  name: string;
  icon: IconType;
  href?: string;
}
const LinkItems: Array<LinkItemProps> = [
  { name: "Overview", icon: FiHome, href: "/" },
  { name: "Expenses", icon: FiTrendingUp, href: "/expenses" },
  { name: "Income", icon: IoIosWallet, href: "/income" },
  { name: "Favourites", icon: FiStar },
  { name: "Settings", icon: FiSettings },
];

export function getRouteText(pathname: string) {
  switch (pathname) {
    case "/":
      return "";
    case "/expenses":
      return "Expenses";
    case "/income":
      return "Income";
    default:
      return "Expense Tracker";
  }
}

export default function SimpleSidebar() {
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <Box width={"30vw"}>
      <SidebarContent
        onClose={() => onClose}
        display={{ base: "none", md: "block" }}
      />
      <Drawer
        isOpen={isOpen}
        placement="left"
        onClose={onClose}
        returnFocusOnClose={false}
        onOverlayClick={onClose}
        size="xs"
      >
        <DrawerContent maxWidth={"30vw !important"}>
          <SidebarContent onClose={onClose} />
        </DrawerContent>
      </Drawer>
      <MobileNav display={{ base: "flex", md: "none" }} onOpen={onOpen} />
    </Box>
  );
}

interface SidebarProps extends BoxProps {
  onClose: () => void;
}

const SidebarContent = ({ onClose, ...rest }: SidebarProps) => {
  return (
    <Stack
      bg={"#0d1325"}
      borderRight="1px"
      borderColor={"GrayText"}
      w={{ base: "30vw", md: 40, lg: 40 }}
      pos="fixed"
      h="full"
      {...rest}
    >
      <HStack alignItems="center" ml="1rem" justifyContent="flex-end" dir="row">
        <CloseButton
          display={{ base: "flex", md: "none" }}
          onClick={onClose}
          ml={"1rem"}
          color="white"
        />
      </HStack>
      {LinkItems.map((link: any) => (
        <NavItem key={link.name} icon={link.icon} href={link.href}>
          {link.name}
        </NavItem>
      ))}
    </Stack>
  );
};

interface NavItemProps extends FlexProps {
  icon: IconType;
  children: ReactText;
  href: string;
}
const NavItem = ({ icon, children, href }: NavItemProps) => {
  const route = useRouter();
  const routePath = getRouteText(route.pathname);
  return (
    typeof href === "string" && (
      <Link href={href}>
        <Stack
          style={{ textDecoration: "none", marginTop: "1rem" }}
          _focus={{ boxShadow: "none" }}
          _active={{ bg: "gray.400" }}
          color="white"
          p="4"
          borderRadius="lg"
          role="group"
          cursor="pointer"
          _hover={{
            bg: "gray",
            color: "white",
          }}
          justify-content={"center"}
          background={
            children === routePath || children === "Overview" && routePath===""
              ? "#334455"
              : "none"
          }
        >
          {icon && (
            <>
              <HStack _active={{ color: "gray" }}>
                <Text gap={".5rem"}>{children}</Text>
                <Icon
                  mr="4"
                  fontSize="16"
                  _groupHover={{
                    color: "white",
                  }}
                  as={icon}
                />
              </HStack>
            </>
          )}
        </Stack>
      </Link>
    )
  );
};

interface MobileProps extends FlexProps {
  onOpen: () => void;
}

const MobileNav = ({ onOpen, ...rest }: MobileProps) => {
  const route = useRouter();
  const routeText = getRouteText(route.pathname);
  return (
    <Flex
      ml={{ base: 0, md: 60 }}
      px={{ base: 4, md: 24 }}
      height="20"
      alignItems="center"
      borderBottomColor={useColorModeValue("gray.200", "gray.700")}
      justifyContent="flex-start"
      {...rest}
    >
      <IconButton
        variant="outline"
        color={"white"}
        onClick={onOpen}
        aria-label="open menu"
        _hover={{ bg: "gray", color: "white" }}
        icon={<FiMenu />}
      />

      <Text
        fontSize="2xl"
        ml="8"
        fontFamily="monospace"
        fontWeight="bold"
        color={"white"}
      >
        {routeText}
      </Text>
    </Flex>
  );
};
