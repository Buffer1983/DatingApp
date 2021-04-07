using System.ComponentModel.DataAnnotations.Schema;

namespace API.Entities
{
    // Declarin that is a table. Entity will create it when run the command on powershell
    [Table("Photos")]
    public class Photo
    {
        public int Id{get; set;}
        public string Url { get; set; }
        public bool IsMain{ get; set; }
        public string PublicId { get; set; }
        public AppUser AppUSer { get; set; }
        public int AppUserId {get; set;}

    }
}