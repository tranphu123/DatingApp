using System.Threading.Tasks;
using DatingApp.API.Models;

namespace DatingApp.API.Data
{
    public interface IAuthRespository
    {
         Task<Users> login(string Username,string Password);
         Task<Users> Register(Users user,string Password);
         Task<bool> UserExists(string Username);
    }
}