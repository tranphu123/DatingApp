using System;
using System.Threading.Tasks;
using DatingApp.API.Models;
using Microsoft.EntityFrameworkCore;

namespace DatingApp.API.Data
{
    public class AuthRespository : IAuthRespository
    {
        private readonly DataContext _context;
        public AuthRespository(DataContext context)
        {
            _context = context;

        }
        public async Task<Users> login(string username, string password)
        {
            var user = await _context.Users.FirstOrDefaultAsync(x=> x.Username == username);
            if(user == null) 
                return null;
            if(!VerifypasswordHash(password,user.PasswordHash,user.PasswordSalt)) 
            return null;

            return user;
        }

        private bool VerifypasswordHash(string password, byte[] passwordHash, byte[] passwordSalt)
        {
            using(var hmac = new System.Security.Cryptography.HMACSHA512(passwordSalt))
            {  
               var computedHash =hmac.ComputeHash(System.Text.Encoding.UTF8.GetBytes(password));
               for(int i =0;i<computedHash.Length;i++)
               {
                if (computedHash [i] != passwordHash[i]) return false;
               }
            }
            return true;
        }

        public async Task<Users> Register(Users user, string password)
        {
           byte[] PasswordHash,PasswordSalt;
           CreatePasswordHash(password,out PasswordHash, out PasswordSalt);
           user.PasswordHash =PasswordHash;
           user.PasswordSalt = PasswordSalt;
           await _context.Users.AddAsync(user);
            await _context.SaveChangesAsync();
            return user;
        }

        private void CreatePasswordHash(string password, out byte[] passwordHash, out byte[] passwordSalt)
        {
            using(var hmac = new System.Security.Cryptography.HMACSHA512())
            {
                passwordSalt =hmac.Key;
                passwordHash =hmac.ComputeHash(System.Text.Encoding.UTF8.GetBytes(password));
            }
        }

        public async Task<bool> UserExists(string username)
        {
           if(await _context.Users.AnyAsync(x => x.Username ==username))
           return true;
           return false;
        }
    }
}