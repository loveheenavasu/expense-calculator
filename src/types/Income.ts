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
    id:string
}