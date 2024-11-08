using System.Collections.Generic;
using System.Threading.Tasks;
using Models;

namespace Services
{
    public interface IPMedicalService
    {
        Task<List<PMedical>> GetAllPMedicalsAsync();
        Task<PMedical?> GetPMedicalByIdAsync(int id);
        Task<PMedical> CreatePMedicalAsync(PMedical model, int id);
        Task UpdatePMedicalAsync(PMedical pMedical);
        Task<bool> DeletePMedicalAsync(int id);

    }
}
