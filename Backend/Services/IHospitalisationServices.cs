using System.Collections.Generic;
using System.Threading.Tasks;
using Models;

namespace Services
{
    public interface IHospitalisationService
    {
        Task<List<Hospitalisation>> GetAllHospitalisationAsync();
        Task<Hospitalisation?> GetHospitalisationByIdAsync(int id);
        Task UpdateHospitalisationAsync(Hospitalisation hospitalisation);
        Task<bool> DeleteHospitalisationAsync(int id);
    }
}
