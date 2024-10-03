using System.Collections.Generic;
using System.Threading.Tasks;
using Models;

namespace Repositories
{
    public interface IMaterialRepository
    {
        Task<List<Material>> GetAllAsync();
        Task<Material?> GetByIdAsync(int id);
        Task<Material> CreateAsync(Material material);
        Task UpdateAsync(Material material);
        Task<bool> DeleteAsync(int id);
    }
}
