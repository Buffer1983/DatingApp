using System;

namespace API.Entities
{
    public class MemberOnSite
    {
        public int Id {get;set;}
        public string FirstName {get;set;}
        public string LastName {get;set;}
        public string LastAccessDoor {get;set;}
        public DateTime LastAccessTime {get;set;}
        public string Department {get;set;}
        public string OrderColumn {get;set;}
    }
}