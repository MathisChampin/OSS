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
    }
}
