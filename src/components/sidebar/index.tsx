'use client'

import React from 'react'
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
} from '@chakra-ui/react'
import {
  FiHome,
  FiTrendingUp,
  FiCompass,
  FiStar,
  FiSettings,
  FiMenu,
} from 'react-icons/fi'
import {IoIosWallet} from 'react-icons/io';
import { IconType } from 'react-icons'
import { ReactText } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/router';

interface LinkItemProps {
  name: string
  icon: IconType
  href?:string
}
const LinkItems: Array<LinkItemProps> = [
  { name: 'Home', icon: FiHome,href:'/'},
  { name: 'Expenses', icon: FiTrendingUp,href:'/expenses'},
  { name: 'Income', icon: IoIosWallet,href:'/income' },
  { name: 'Favourites', icon: FiStar },
  { name: 'Settings', icon: FiSettings },
]

export default function SimpleSidebar() {
  const { isOpen, onOpen, onClose } = useDisclosure()

  return (
    <Box width={'30vw'}>
      <SidebarContent onClose={() => onClose} display={{ base: 'none', md: 'block' }} />
      <Drawer
        isOpen={isOpen}
        placement="left"
        onClose={onClose}
        returnFocusOnClose={false}
        onOverlayClick={onClose}
        size='xs'
        >
        <DrawerContent maxWidth={'30vw !important'}>
          <SidebarContent onClose={onClose} />
        </DrawerContent>
      </Drawer>
      <MobileNav display={{ base: 'flex', md: 'none' }} onOpen={onOpen} />
    </Box>
  )
}

interface SidebarProps extends BoxProps {
  onClose: () => void
}

const SidebarContent = ({ onClose, ...rest }: SidebarProps) => {
  return (
    <Box
      bg={useColorModeValue('white', 'gray.900')}
      borderRight="1px"
      borderRightColor={useColorModeValue('gray.200', 'gray.700')}
      w={{ base: '30vw', md:40,lg:40}}
      pos="fixed"
      h="full"
      {...rest}>
      <HStack  alignItems="center" mx="8" justifyContent="space-between" dir='row'>
        {/* <Text fontSize="md" fontFamily="monospace" fontWeight="bold" >
        Expenses 
        </Text> */}
        <CloseButton display={{ base: 'flex', md: 'none' }} onClick={onClose} />
      </HStack>
      {LinkItems.map((link:any) => (
        <NavItem key={link.name} icon={link.icon} href={link?.href}>
          {link.name}
        </NavItem>
      ))}
    </Box>
  )
}

interface NavItemProps extends FlexProps {
  icon: IconType
  children: ReactText
  href:string
}
const NavItem = ({ icon, children,href }: NavItemProps) => {
  return (
    <Stack
      as={'a'}
      href={href}
      style={{ textDecoration: 'none' }}
      _focus={{ boxShadow: 'none' }}
        p="4"
        borderRadius="lg"
        role="group"
        cursor="pointer"
        _hover={{
          bg: 'cyan.400',
          color: 'white',
        }}>
        {icon && (
          <>
          <HStack>
          <Text gap={'.5rem'}>
            {children}
            </Text>
          <Icon
            mr="4"
            fontSize="16"
            _groupHover={{
              color: 'white',
            }}
            as={icon}
          />
          </HStack>
          </>
        )}
    </Stack>
  )
}

interface MobileProps extends FlexProps {
  onOpen: () => void
}
function getRouteText(pathname:string) {
  switch (pathname) {
    case '/':
      return 'Expenses';
    case '/expenses':
      return 'Expenses';
    case '/income':
      return 'Income';
    default:
      return 'Expense Tracker'; 
  }
}
const MobileNav = ({ onOpen, ...rest }: MobileProps) => {
  const route=useRouter();
  const routeText = getRouteText(route.pathname);
  return (
    <Flex
      ml={{ base: 0, md: 60 }}
      px={{ base: 4, md: 24 }}
      height="20"
      alignItems="center"
      bg={useColorModeValue('white', 'gray.900')}
      borderBottomWidth="1px"
      borderBottomColor={useColorModeValue('gray.200', 'gray.700')}
      justifyContent="flex-start"
      {...rest}>
      <IconButton
        variant="outline"
        onClick={onOpen}
        aria-label="open menu"
        icon={<FiMenu />}
      />

      <Text fontSize="2xl" ml="8" fontFamily="monospace" fontWeight="bold">
       {routeText}
      </Text>
    </Flex>
  )
}