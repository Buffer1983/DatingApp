export interface FuelExpense 
{
    id:number;
    invoiceNumber: string;
    invoiceDate: Date;
    invoiceAmount: number;
    tripDescription: string;
    licenseNumber: string;
    carModel: string;
    fuelType: string;
    invoiceLitres: number;
    carKm: number;
    tripOutside: string;
    scheduledTrip: string;
    tripOutsideKm: number;
    userId:number;
    username: string;
}