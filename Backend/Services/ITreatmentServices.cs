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
        Task<Object?> GetTreatmentStatisticsByNameCurrentAsync(string name);
        Task<Object?> GetTreatmentStatisticsByNameDieAsync(string name);
        Task<Object?> GetTreatmentStatisticsByNameHealAsync(string name);
        Task<Object?> GetTreatmentStatisticsByNameAsync(string name);
        Task<Object?> GetTreatmentStatisticsHealAsync();
        Task<Object?> GetTreatmentStatisticsDieAsync();
        Task<Object?> GetTreatmentStatisticsCurrentAsync();
        Task<Object?> GetPercentageOfCurrentPatientsByTreatmentAsync(string name);
        Task<Object?> GetPercentageOfDiePatientsByTreatmentAsync(string name);
        Task<Object?> GetPercentageOfHealPatientsByTreatmentAsync(string name);
    }
}
