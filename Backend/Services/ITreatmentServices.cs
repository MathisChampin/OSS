using System.Collections.Generic;
using System.Threading.Tasks;
using Models;

namespace Services
{
    public interface ITreatmentService
    {
        Task<List<Treatment>> GetAllTreatmentsAsync();
        Task<List<Treatment>> GetTreatmentByNameAsync(string name);
        Task<Treatment> CreateTreatmentAsync(Treatment model);
        Task<Object?> GetTreatmentStatisticsCurrentAsync(string name);
        Task<Object?> GetTreatmentStatisticsDieAsync(string name);
        Task<Object?> GetTreatmentStatisticsHealAsync(string name);
    }
}
