using System.Collections.Generic;
using System.Threading.Tasks;
using Repositories;
using Models;

namespace Services
{
    public class HospitalService : IHospitalService
    {
        private readonly IHospitalRepository _hospitalRepository;

        public HospitalService(IHospitalRepository hospitalRepository)
        {
            _hospitalRepository = hospitalRepository;
        }

        public async Task<List<Hospital>> GetAllHospitalsAsync()
        {
            return await _hospitalRepository.GetAllAsync();
        }

        public async Task<Hospital?> GetHospitalByIdAsync(int id)
        {
            return await _hospitalRepository.GetByIdAsync(id);
        }
        public async Task<Hospital> CreateHospitalAsync(Hospital hospital)
        {
            var existingHospital = await _hospitalRepository.GetByIdAsync(hospital.Id);
            if (existingHospital != null)
                throw new InvalidOperationException("L'hôpital existe déjà.");
            return await _hospitalRepository.CreateAsync(hospital);
        }
        public async Task UpdateHospitalAsync(Hospital hospital)
        {
            await _hospitalRepository.UpdateAsync(hospital);
        }

        public async Task<bool> DeleteHospitalAsync(int id)
        {
            return await _hospitalRepository.DeleteAsync(id);
        }
    }
}
