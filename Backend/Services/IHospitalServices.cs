using System.Collections.Generic;
using System.Threading.Tasks;
using Models;

namespace Services
{
    public interface IHospitalService
    {
        Task<List<Hospital>> GetAllHospitalsAsync();
        Task<Hospital?> GetHospitalByIdAsync(int id);
        Task<Hospital> CreateHospitalAsync(Hospital hospital);
        Task UpdateHospitalAsync(Hospital hospital);
        Task<bool> DeleteHospitalAsync(int id);
    }
}
