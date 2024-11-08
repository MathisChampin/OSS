using System.Collections.Generic;
using System.Threading.Tasks;
using Models;

namespace Repositories
{
    public interface IPNoMedicalRepository
    {
        Task<List<PNoMedical>> GetAllAsync();
        Task<PNoMedical?> GetByIdAsync(int id);
        Task<PNoMedical> CreateAsync(PNoMedical pNoMedical);
        Task UpdateAsync(PNoMedical noMedical);
        Task<bool> DeleteAsync(int id);
    }
}
