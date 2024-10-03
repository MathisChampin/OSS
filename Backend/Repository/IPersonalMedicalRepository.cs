using System.Collections.Generic;
using System.Threading.Tasks;
using Models;

namespace Repositories
{
    public interface IPMedicalRepository
    {
        Task<List<PMedical>> GetAllAsync();
    }
}
