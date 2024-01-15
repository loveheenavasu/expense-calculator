import { SetStateAction } from "react";

export interface CommonModalProps{
    isOpen:boolean;
    setIsOpen:React.Dispatch<SetStateAction<boolean>>
}
export interface ExpenseFormData {
    name_type: string;
    price:number;
    spendDate: string;
    category: string;
    paidVia: string;
    description: string;
    id:number
  }
export interface IncomeFormData{
    name_type:string,
    amount:number,
    receivedDate:string,
    category:string,
    description:string,
    id:string
}