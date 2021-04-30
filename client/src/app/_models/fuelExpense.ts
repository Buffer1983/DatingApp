export interface FuelExpense 
{
    id:number
    invoiceNumber: string;
    userId:number
    username: string
    invoiceDate: Date
    insertDate: Date
    invoiceAmount: number
    numOfKm : number
    comments : string
}