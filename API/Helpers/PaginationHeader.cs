namespace API.Helpers
{
    //We create this class in order to send back pagination info to the client with http response header.
    public class PaginationHeader
    {
        //when we create a new object of this class, we have to supply these parameters
        public PaginationHeader(int currentPage, int itemsPerPage, int totalItems, int totalPages)
        {
            CurrentPage = currentPage;
            ItemsPerPage = itemsPerPage;
            TotalItems = totalItems;
            TotalPages = totalPages;
        }

        public int CurrentPage { get; set; }
        public int ItemsPerPage { get; set; }
        public int TotalItems { get; set; }
        public int TotalPages { get; set; }

    }
}