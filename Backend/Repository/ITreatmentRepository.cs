using System.Collections.Generic;
using System.Threading.Tasks;
using Models;

namespace Repositories
{
    public interface ITreatmentRepository
    {
        Task<List<Treatment>> GetAllAsync();
        Task<List<Treatment>> GetByNameAsync(string name);
        Task<Treatment?> GetByIdAsync(int id);
        Task<Treatment> CreateAsync(Treatment treatment);
        Task<Treatment> UpdateAsync(Treatment treatment);
        Task<bool> DeleteAsync(int id);
    }
}
