using System.ComponentModel.DataAnnotations;

namespace DatingApp.API.Models
{
    public class Users
    {
        [Key] 
        public string Username { get; set; }
        public string Password { get; set; }
        public byte[] PasswordHash { get; set; }
        public byte[] PasswordSalt { get; set; }
    }
}