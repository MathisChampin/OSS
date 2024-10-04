using System.Collections.Generic;
using System.Threading.Tasks;
using Models;

namespace Services
{
    public interface IUserService
    {
        Task<List<User>> GetAllUsersAsync();
        Task<User?> GetUserByIdAsync(int id);
        Task<User> CreateUserAsync(User user);
        Task UpdateUserAsync(User user);
        Task<bool> DeleteUserAsync(int id);
        Task<User?> AuthenticateAsync(string email, string password);
    }
}
