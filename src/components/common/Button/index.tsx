import { Button,Text } from '@chakra-ui/react'
import React from 'react'

interface ButtonProps {
    children:string
    type:"submit" | "reset"
    fontSize:string
}

export const CustomButton= ({children,type,fontSize} :ButtonProps) => {
  return (
    <Button color="black" bg='white' width={'100%'} type={type||'submit'}>
      <Text fontSize={fontSize}>{children}</Text>
    </Button>
  )
}
