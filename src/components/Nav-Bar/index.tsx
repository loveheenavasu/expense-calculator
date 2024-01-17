import { Text } from '@chakra-ui/react';
import React from 'react'

type NavBarProps = {
    title:string
}

export const Navbar = ({title}: NavBarProps) => {
  return (
    <Text  fontSize={{sm:'1.5rem',md:'1.5rem',lg:'2rem'}} fontWeight='700' ml='1rem' >{title}</Text>
  )
}
