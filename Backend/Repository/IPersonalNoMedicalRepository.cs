using System.Collections.Generic;
using System.Threading.Tasks;
using Models;

namespace Repositories
{
    public interface IPNoMedicalRepository
    {
        Task<List<PNoMedical>> GetAllAsync();
    }
}
