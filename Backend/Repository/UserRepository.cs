using Microsoft.EntityFrameworkCore;
using System.Collections.Generic;
using System.Threading.Tasks;
using Backend;
using Models;

namespace Repositories
{
    public class UserRepository : IUserRepository
    {
        private readonly DataContext _context;

        public UserRepository(DataContext context)
        {
            _context = context;
        }

        public async Task<List<User>> GetAllAsync()
        {
            return await _context.Users.ToListAsync();
        }

        public async Task<User?> GetByIdAsync(int id)
        {
            return await _context.Users.FirstOrDefaultAsync(u => u.Id == id);
        }

        public async Task<User?> GetUserByEmailAndHospitalIdAsync(string email, int hospitalId)
        {
            return await _context.Users.FirstOrDefaultAsync(u => u.Email == email && u.HospitalId == hospitalId);
        }

        public async Task<User?> GetByEmailAsync(string email)
        {
            return await _context.Users
                .FirstOrDefaultAsync(u => u.Email == email);
        }

        public async Task<User> CreateAsync(User user)
        {
            _context.Users.Add(user);
            await _context.SaveChangesAsync();
            return user;
        }
        public async Task UpdateAsync(User user)
        {
            _context.Entry(user).State = EntityState.Modified;
            await _context.SaveChangesAsync();
        }
        public async Task<bool> DeleteAsync(int id)
        {
            var user = await GetByIdAsync(id);
            if (user == null)
                return false;
            _context.Users.Remove(user);
            return await _context.SaveChangesAsync() > 0;
        }

        public async Task<string> GenerateRefreshTokenAsync(int userId)
        {
            var user = await _context.Users.FindAsync(userId);
            if (user == null)
                throw new Exception("User not found");

            var refreshToken = Guid.NewGuid().ToString();
            var expiration = DateTime.UtcNow.AddDays(7);

            var tokenEntity = new RefreshToken
            {
                UserId = userId,
                HospitalId = user.HospitalId,
                Token = refreshToken,
                Expiration = expiration
            };

            await _context.RefreshTokens.AddAsync(tokenEntity);
            await _context.SaveChangesAsync();

            return refreshToken;
        }
        public async Task<(int? userId, int? hospitalId)> ValidateRefreshTokenAsync(string refreshToken)
        {
            var token = await _context.RefreshTokens
                .FirstOrDefaultAsync(rt => rt.Token == refreshToken && rt.Expiration > DateTime.UtcNow);
            return (token?.UserId, token?.HospitalId);
        }
    }
}
