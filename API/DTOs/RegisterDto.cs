using System;
using System.ComponentModel.DataAnnotations;

namespace API.DTOs
{
    public class RegisterDto
    {
        [Required] public string Username { get; set; }
        [Required] public string KnownAs { get; set; }
        [Required] public string Gender { get; set; }
        [Required] public string City { get; set; }
        [Required] public string Country { get; set; }
        [Required] public DateTime DateOfBirth { get; set; }

        [Required]
        //We set string limit to password,with minimum 4 chars and 8 maximum
        [StringLength(16,MinimumLength=8)]
        public string Password { get; set; }

    
    }
}