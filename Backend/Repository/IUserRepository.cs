using System.Collections.Generic;
using System.Threading.Tasks;
using Models;

namespace Repositories
{
    public interface IUserRepository
    {
        Task<List<User>> GetAllAsync();
        Task<User?> GetByIdAsync(int id);
        Task<User> CreateAsync(User user);
        Task<User?> GetUserByEmailAndHospitalIdAsync(string email, int hospitalId);
        Task<User?> GetByEmailAsync(string email);
        Task UpdateAsync(User user);
        Task<bool> DeleteAsync(int id);
    }
}
