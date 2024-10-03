using System.Collections.Generic;
using System.Threading.Tasks;
using Models;

namespace Services
{
    public interface IDeviceService
    {
        Task<List<Device>> GetAllDeviceAsync();
        Task<Device?> GetDeviceByIdAsync(int id);
        Task<Device> CreateDeviceAsync(Device Device);
        Task UpdateDeviceAsync(Device Device);
        Task<bool> DeleteDeviceAsync(int id);
    }
}
