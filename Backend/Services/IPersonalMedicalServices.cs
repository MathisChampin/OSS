using System.Collections.Generic;
using System.Threading.Tasks;
using Models;

namespace Services
{
    public interface IPMedicalService
    {
        Task<List<PMedical>> GetAllPMedicalsAsync();
    }
}
