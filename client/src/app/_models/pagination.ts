export interface Pagination{
    //the names should be exact the same as sent in http response in pagination header
    currentPage: number;
    itemsPerPage: number;
    totalItems: number;
    totalPages: number;
}

//We give parameter value of <T> in order to accept all of different types 
export class PaginatedResult<T>{
    result: T; // anything as was the source
    pagination: Pagination;
}