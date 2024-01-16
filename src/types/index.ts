import { SetStateAction } from "react";
export interface CommonModalProps{
    isOpen:boolean;
    setIsOpen:React.Dispatch<SetStateAction<boolean>>
}
