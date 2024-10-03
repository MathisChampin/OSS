using System.Collections.Generic;
using System.Threading.Tasks;
using Repositories;
using Models;
using Microsoft.EntityFrameworkCore.Infrastructure;

namespace Services
{
    public class MaterialService : IMaterialService
    {
        private readonly IMaterialRepository _materialRepository;
        private readonly IHospitalRepository _hospitalRepository;
        public MaterialService(IMaterialRepository materialRepository, IHospitalRepository hospitalRepository)
        {
            _materialRepository = materialRepository;
            _hospitalRepository = hospitalRepository;
        }

        public async Task<List<Material>> GetAllMaterialsAsync()
        {
            return await _materialRepository.GetAllAsync();
        }
    }
}
