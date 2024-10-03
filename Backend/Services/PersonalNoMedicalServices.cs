using System.Collections.Generic;
using System.Threading.Tasks;
using Repositories;
using Models;
using Microsoft.EntityFrameworkCore.Infrastructure;

namespace Services
{
    public class PNoMedicalService : IPNoMedicalService
    {
        private readonly IPNoMedicalRepository _noMedicalRepository;
        private readonly IHospitalRepository _hospitalRepository;

        public PNoMedicalService(IPNoMedicalRepository noMedicalRepository, IHospitalRepository hospitalRepository)
        {
            _noMedicalRepository = noMedicalRepository;
            _hospitalRepository = hospitalRepository;
        }

        public async Task<List<PNoMedical>> GetAllPNoMedicalsAsync()
        {
            return await _noMedicalRepository.GetAllAsync();
        }
        public async Task<PNoMedical?> GetPNoMedicalByIdAsync(int id)
        {
            return await _noMedicalRepository.GetByIdAsync(id);
        }

        public async Task<PNoMedical> CreatePNoMedicalAsync(PNoMedical model, int id)
        {
            var hospital = await _hospitalRepository.GetByIdAsync(id);
            if (hospital == null)
                throw new KeyNotFoundException("L'hôpital n'existe pas dans la base de données.");

            model.HospitalId = hospital.Id;
            var createdPNoMedical = await _noMedicalRepository.CreateAsync(model);
            await _hospitalRepository.AddPNoMedicalToHospitalAsync(hospital, createdPNoMedical);
            return createdPNoMedical;
        }
        public async Task UpdatePNoMedicalAsync(PNoMedical noMedical)
        {
            await _noMedicalRepository.UpdateAsync(noMedical);
        }

        public async Task<bool> DeletePNoMedicalAsync(int id)
        {
            return await _noMedicalRepository.DeleteAsync(id);
        }
    }
}
