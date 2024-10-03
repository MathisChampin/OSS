using System.Collections.Generic;
using System.Threading.Tasks;
using Models;

namespace Repositories
{
    public interface IMaterialRepository
    {
        Task<List<Material>> GetAllAsync();
    }
}
