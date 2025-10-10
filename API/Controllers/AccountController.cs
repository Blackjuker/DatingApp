

using System.Security.Cryptography;
using System.Text;
using API.Data;
using API.DTOs;
using API.Entities;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace API.Controllers
{
    public class AccountController(AppDbContext context) : BaseApiController
    {
        [HttpPost("register")]
        public async Task<ActionResult<AppUser>> Register(RegisterDto registerDto)
        {
            if (await EmailExists(registerDto.Email)) return BadRequest("Email is already taken");
            var hmac = new HMACSHA512();

            var user = new AppUser
            {
                Email = registerDto.Email.ToLower(),
                DisplayName = registerDto.DisplayName,
                PasswordHash = hmac.ComputeHash(Encoding.UTF8.GetBytes(registerDto.password)),
                PasswordSalt = hmac.Key
            };

            context.Users.Add(user);
            await context.SaveChangesAsync();
            return user;
        }

        private async Task<bool> EmailExists(string email)
        {
            return await context.Users.AnyAsync(u => u.Email.ToLower() == email.ToLower());
        }
    }
}
