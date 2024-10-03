using System.Collections.Generic;
using System.Threading.Tasks;
using Models;

namespace Services
{
    public interface IMaterialService
    {
        Task<List<Material>> GetAllMaterialsAsync();
        Task<Material?> GetMaterialByIdAsync(int id);
        Task<Material> CreateMaterialAsync(MaterialWithDevice model, int hospitalId);
        Task UpdateMaterialAsync(Material material);
        Task<bool> DeleteMaterialAsync(int id);
    }
}
