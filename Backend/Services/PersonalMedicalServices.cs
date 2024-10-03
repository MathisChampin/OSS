using System.Collections.Generic;
using System.Threading.Tasks;
using Repositories;
using Models;
using Microsoft.EntityFrameworkCore.Infrastructure;

namespace Services
{
    public class PMedicalService : IPMedicalService
    {
        private readonly IPMedicalRepository _pmedicalRepository;
        private readonly IHospitalRepository _hospitalRepository;

        public PMedicalService(IPMedicalRepository pmedicalRepository, IHospitalRepository hospitalRepository)
        {
            _pmedicalRepository = pmedicalRepository;
            _hospitalRepository = hospitalRepository;
        }

        public async Task<List<PMedical>> GetAllPMedicalsAsync()
        {
            return await _pmedicalRepository.GetAllAsync();
        }
        public async Task<PMedical?> GetPMedicalByIdAsync(int id)
        {
            return await _pmedicalRepository.GetByIdAsync(id);
        }
        public async Task<PMedical> CreatePMedicalAsync(PMedical model, int id)
        {
            var hospital = await _hospitalRepository.GetByIdAsync(id);
            if (hospital == null)
                throw new KeyNotFoundException("L'hôpital n'existe pas dans la base de données.");

            model.HospitalId = hospital.Id;
            var createdPMedical = await _pmedicalRepository.CreateAsync(model);
            await _hospitalRepository.AddPMedicalToHospitalAsync(hospital, createdPMedical);
            return createdPMedical;
        }
        public async Task UpdatePMedicalAsync(PMedical pmedical)
        {
            await _pmedicalRepository.UpdateAsync(pmedical);
        }
        public async Task<bool> DeletePMedicalAsync(int id)
        {
            return await _pmedicalRepository.DeleteAsync(id);
        }
    }
}
