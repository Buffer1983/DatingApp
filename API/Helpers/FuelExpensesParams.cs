using System;

namespace API.Helpers
{
    public class FuelExpensesParams : PaginationParams
    {
        public string Username {get; set;}
        public DateTime FromDate {get;set;}
        public DateTime ToDate {get;set;} = DateTime.UtcNow;
    }
}