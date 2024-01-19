import { SetStateAction } from "react";

export type ExpenseProps = {
    expenseModalOpen:boolean;
    setExpenseModal:React.Dispatch<React.SetStateAction<boolean>>;
    expenseData:any
}
export interface ExpenseFormData {
    name_type: string;
    price:number;
    spendDate: string;
    category: string;
    paidVia: string;
    description: string;
    id:number;
    categoryInput?:string
    paidViaInput?:string
  }
export interface ExpenseModalProps{
    isOpen:boolean;
    setIsOpen:React.Dispatch<SetStateAction<boolean>>
    editId?:number;
}