using System.Collections.Generic;
using System.Threading.Tasks;
using Models;

namespace Repositories
{
    public interface IDeviceRepository
    {
        Task<List<Device>> GetAllAsync();
        Task<Device?> GetByIdAsync(int id);
        Task UpdateAsync(Device device);
        Task<Device> CreateAsync(Device device);
        Task<bool> DeleteAsync(int id);
    }
}
