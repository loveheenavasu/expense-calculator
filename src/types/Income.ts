import { SetStateAction } from "react";

export type IncomeProps = {
    incomeModalOpen:boolean;
    setIncomeModal:React.Dispatch<React.SetStateAction<boolean>>;
    incomeData:any
}
export interface IncomeFormData{
    name_type:string,
    amount:number,
    receivedDate:string,
    category:string,
    description:string,
    id:number,
    receivedInput?:string;
}
export interface IncomeModalProps{
    isOpen:boolean;
    setIsOpen:React.Dispatch<SetStateAction<boolean>>
    editId?:number;
}
