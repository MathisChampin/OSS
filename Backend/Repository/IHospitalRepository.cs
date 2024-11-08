using System.Collections.Generic;
using System.Threading.Tasks;
using Models;

namespace Repositories
{
    public interface IHospitalRepository
    {
        Task<List<Hospital>> GetAllAsync();
        Task<Hospital?> GetByIdAsync(int id);
        Task<Hospital> CreateAsync(Hospital hospital);
        Task UpdateAsync(Hospital hospital);
        Task<bool> DeleteAsync(int id);
        Task<Hospital?> GetByNameAsync(string nomHopital);
        Task AddPatientToHospitalAsync(Hospital hospital, Patient patient);
        Task AddPMedicalToHospitalAsync(Hospital hospital, PMedical pmedical);
        Task AddPNoMedicalToHospitalAsync(Hospital hospital, PNoMedical noMedical);
        Task AddMaterialToHospitalAsync(Hospital hospital, Material material);

    }
}
