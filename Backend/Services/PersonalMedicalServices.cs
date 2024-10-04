using System.Collections.Generic;
using System.Threading.Tasks;
using Repositories;
using Models;
using Microsoft.EntityFrameworkCore.Infrastructure;

namespace Services
{
    public class PMedicalService : IPMedicalService
    {
        private readonly IPMedicalRepository _pMedicalRepository;
        private readonly IHospitalRepository _hospitalRepository;

        public PMedicalService(IPMedicalRepository pMedicalRepository, IHospitalRepository hospitalRepository)
        {
            _pMedicalRepository = pMedicalRepository;
            _hospitalRepository = hospitalRepository;
        }

        public async Task<List<PMedical>> GetAllPMedicalsAsync()
        {
            return await _pMedicalRepository.GetAllAsync();
        }
        public async Task<PMedical?> GetPMedicalByIdAsync(int id)
        {
            return await _pMedicalRepository.GetByIdAsync(id);
        }
        public async Task<PMedical> CreatePMedicalAsync(PMedical model, int id)
        {
            var hospital = await _hospitalRepository.GetByIdAsync(id);
            if (hospital == null)
                throw new KeyNotFoundException("L'hôpital n'existe pas dans la base de données.");

            model.HospitalId = hospital.Id;
            var createdPMedical = await _pMedicalRepository.CreateAsync(model);
            await _hospitalRepository.AddPMedicalToHospitalAsync(hospital, createdPMedical);
            return createdPMedical;
        }
        public async Task UpdatePMedicalAsync(PMedical pMedical)
        {
            await _pMedicalRepository.UpdateAsync(pMedical);
        }
        public async Task<bool> DeletePMedicalAsync(int id)
        {
            return await _pMedicalRepository.DeleteAsync(id);
        }
    }
}
