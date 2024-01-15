import { Button,Text } from '@chakra-ui/react'
import React from 'react'

interface ButtonProps {
    children:string
    type?:"submit" | "reset"
    fontSize:string,
    bg:string,
    onClick?:React.MouseEventHandler<HTMLButtonElement> 
    color?:string;
}

export const CustomButton= ({children,type,fontSize,onClick,bg,color} :ButtonProps) => {
  return (
    <Button color={color||"black"} bg={bg} width={'100%'} type={type||'submit'} onClick={onClick} colorScheme={bg||'white'}>
      <Text fontSize={fontSize}>{children}</Text>
    </Button>
  )
}
