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
        private readonly IDeviceRepository _deviceRepository;

        public MaterialService(IMaterialRepository materialRepository, IHospitalRepository hospitalRepository, IDeviceRepository deviceRepository)
        {
            _materialRepository = materialRepository;
            _hospitalRepository = hospitalRepository;
            _deviceRepository = deviceRepository;
        }

        public async Task<List<Material>> GetAllMaterialsAsync()
        {
            return await _materialRepository.GetAllAsync();
        }
        public async Task<Material?> GetMaterialByIdAsync(int id)
        {
            return await _materialRepository.GetByIdAsync(id);
        }
        public async Task<Material> CreateMaterialAsync(MaterialWithDevice model, int hospitalId)
        {
            var hospital = await _hospitalRepository.GetByIdAsync(hospitalId);
            if (hospital == null)
                throw new KeyNotFoundException("L'hôpital n'existe pas dans la base de données.");

            model.Material.HospitalId = hospital.Id;

            var createdMaterial = await _materialRepository.CreateAsync(model.Material);

            model.Device.MaterialId = createdMaterial.Id;

            await _deviceRepository.CreateAsync(model.Device);

            await _hospitalRepository.AddMaterialToHospitalAsync(hospital, createdMaterial);

            return createdMaterial;
        }
        public async Task UpdateMaterialAsync(Material material)
        {
            await _materialRepository.UpdateAsync(material);
        }

        public async Task<bool> DeleteMaterialAsync(int id)
        {
            return await _materialRepository.DeleteAsync(id);
        }
    }
}
