namespace API.Helpers
{
    // Actually our default parameters for pagination for users.
    public class UserParams
    {
        private const int MaxPageSize = 50;
        public int PageNumber {get; set;} = 1;
        private int _pageSize = 10;
        //if _pageSize value>MaxPageSize , then set to MaxPageSize
        public int PageSize{
            get =>_pageSize;
            set => _pageSize = (value>MaxPageSize)? MaxPageSize:value;
        }

        public string CurrentUsername { get; set; }
        public int MinAge {get;set;}= 18;
        public int MaxAge {get; set;}=150;
        public string Gender {get;set;}
        public string OrderBy{get; set;}= "lastActive";
    }
}