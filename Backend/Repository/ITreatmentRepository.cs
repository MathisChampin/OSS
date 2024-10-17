using System.Collections.Generic;
using System.Threading.Tasks;
using Models;

namespace Repositories
{
    public interface ITreatmentRepository
    {
        Task<List<Treatment>> GetAllAsync();
        Task<List<Treatment>> GetByNameAsync(string name);
        Task<Treatment> CreateAsync(Treatment treatment);
    }
}
