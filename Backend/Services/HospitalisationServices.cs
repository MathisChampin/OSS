using System.Collections.Generic;
using System.Threading.Tasks;
using Repositories;
using Models;

namespace Services
{
    public class HospitalisationService : IHospitalisationService
    {
        private readonly IHospitalisationRepository _hospitalisationRepository;

        public HospitalisationService(IHospitalisationRepository hospitalisationRepository)
        {
            _hospitalisationRepository = hospitalisationRepository;
        }

        public async Task<List<Hospitalisation>> GetAllHospitalisationAsync()
        {
            return await _hospitalisationRepository.GetAllAsync();
        }

        public async Task<Hospitalisation?> GetHospitalisationByIdAsync(int id)
        {
            return await _hospitalisationRepository.GetByIdAsync(id);
        }

        public async Task<Hospitalisation> CreateHospitalisationAsync(Hospitalisation hospitalisation)
        {
            var existingHospitalisation = await _hospitalisationRepository.GetByIdAsync(hospitalisation.Id);
            if (existingHospitalisation != null)
                throw new InvalidOperationException("L'hôpitalisation existe déjà.");
            return await _hospitalisationRepository.CreateAsync(hospitalisation);
        }

        public async Task UpdateHospitalisationAsync(Hospitalisation hospitalisation)
        {
            await _hospitalisationRepository.UpdateAsync(hospitalisation);
        }

        public async Task<bool> DeleteHospitalisationAsync(int id)
        {
            return await _hospitalisationRepository.DeleteAsync(id);
        }
    }
}
