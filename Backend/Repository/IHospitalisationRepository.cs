using System.Collections.Generic;
using System.Threading.Tasks;
using Models;

namespace Repositories
{
    public interface IHospitalisationRepository
    {
        Task<List<Hospitalisation>> GetAllAsync();
        Task<Hospitalisation?> GetByIdAsync(int id);
        Task UpdateAsync(Hospitalisation hospitalisation);
        Task<Hospitalisation> CreateAsync(Hospitalisation hospitalisation);
        Task<bool> DeleteAsync(int id);
    }
}
