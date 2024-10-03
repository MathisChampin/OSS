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
    }
}
