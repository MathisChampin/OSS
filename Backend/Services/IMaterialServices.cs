using System.Collections.Generic;
using System.Threading.Tasks;
using Models;

namespace Services
{
    public interface IMaterialService
    {
        Task<List<Material>> GetAllMaterialsAsync();
    }
}
