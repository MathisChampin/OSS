using System.Collections.Generic;
using System.Threading.Tasks;
using Models;

namespace Services
{
    public interface IPNoMedicalService
    {
        Task<List<PNoMedical>> GetAllPNoMedicalsAsync();
        Task<PNoMedical?> GetPNoMedicalByIdAsync(int id);
        Task<PNoMedical> CreatePNoMedicalAsync(PNoMedical model, int id);

    }
}
