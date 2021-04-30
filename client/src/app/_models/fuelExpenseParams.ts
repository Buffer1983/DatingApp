import { FuelExpense} from './fuelExpense';
import { PaginatedResult } from './pagination';


export class FuelExpenseParams {

    username: string;
    fromDate: Date;
    toDate: Date;
    pageNumber = 1;
    pageSize = 6;
    orderBy = 'invoiceDate';

    constructor(fuelExpense:FuelExpense) {
        this.username = fuelExpense.username;
    }
}