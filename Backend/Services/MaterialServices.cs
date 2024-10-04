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
        private readonly IDeviceRepository _deviceRepository;
        private readonly IHospitalRepository _hospitalRepository;

        public MaterialService(IMaterialRepository materialRepository, IDeviceRepository deviceRepository, IHospitalRepository hospitalRepository)
        {
            _materialRepository = materialRepository;
            _deviceRepository = deviceRepository;
            _hospitalRepository = hospitalRepository;
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
            foreach (var device in model.Devices)
            {
                device.MaterialId = createdMaterial.Id;
                await _deviceRepository.CreateAsync(device);
            }
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
