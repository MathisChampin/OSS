using System.Collections.Generic;
using System.Threading.Tasks;
using Repositories;
using Models;

namespace Services
{
    public class DeviceService : IDeviceService
    {
        private readonly IDeviceRepository _deviceRepository;

        public DeviceService(IDeviceRepository deviceRepository)
        {
            _deviceRepository = deviceRepository;
        }

        public async Task<List<Device>> GetAllDeviceAsync()
        {
            return await _deviceRepository.GetAllAsync();
        }

        public async Task<Device?> GetDeviceByIdAsync(int id)
        {
            return await _deviceRepository.GetByIdAsync(id);
        }

        public async Task<Device> CreateDeviceAsync(Device device)
        {
            var existingDevice = await _deviceRepository.GetByIdAsync(device.Id);
            if (existingDevice != null)
                throw new InvalidOperationException("L'équipement existe déjà.");
            return await _deviceRepository.CreateAsync(device);
        }

        public async Task UpdateDeviceAsync(Device device)
        {
            await _deviceRepository.UpdateAsync(device);
        }

        public async Task<bool> DeleteDeviceAsync(int id)
        {
            return await _deviceRepository.DeleteAsync(id);
        }
    }
}
