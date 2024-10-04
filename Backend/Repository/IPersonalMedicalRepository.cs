using System.Collections.Generic;
using System.Threading.Tasks;
using Models;

namespace Repositories
{
    public interface IPMedicalRepository
    {
        Task<List<PMedical>> GetAllAsync();
        Task<PMedical?> GetByIdAsync(int id);
        Task<PMedical> CreateAsync(PMedical pMedical);
        Task UpdateAsync(PMedical pMedical);
        Task<bool> DeleteAsync(int id);
    }
}
