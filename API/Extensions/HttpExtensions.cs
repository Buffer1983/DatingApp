using System.Text.Json;
using API.Helpers;
using Microsoft.AspNetCore.Http;

namespace API.Extensions
{
    public static class HttpExtensions
    {
        public static void AddPaginationHeader(this HttpResponse response,int currentPage, int itemsPerPage, int totalItems,int totalPages){
            var paginationHeader = new PaginationHeader(currentPage,itemsPerPage,totalItems,totalPages);
            var options = new JsonSerializerOptions{
                PropertyNamingPolicy = JsonNamingPolicy.CamelCase
            };
            //we add the header Pagination to our http response and as value we serialize Json the values
            response.Headers.Add("Pagination",JsonSerializer.Serialize(paginationHeader,options));
            //We have to declare that the newly created Attribute its exposed
            response.Headers.Add("Access-Control-Expose-Headers","Pagination");
        }
        
    }
}