using System.Collections.Generic;
using System.Threading.Tasks;
using Models;

namespace Services
{
    public interface ITreatmentService
    {
        Task<List<Treatment>> GetAllTreatmentsAsync();
        Task<List<Treatment>> GetTreatmentByNameAsync(string name);
        Task<Treatment?> GetTreatmentByIdAsync(int id);
        Task<Treatment> CreateTreatmentAsync(Treatment model);
        Task<Treatment?> UpdateTreatmentAsync(int id, Treatment model);
        Task<bool> DeleteTreatmentAsync(int id);
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
        Task<KeyValuePair<string, double>?> GetBestTreatmentAsync();
        Task<KeyValuePair<string, double>?> GetLeastTreatmentAsync();
        Task<KeyValuePair<string, double>?> GetBestTreatmentByDurationAsync(int week);
        Task<KeyValuePair<string, double>?> GetLeastTreatmentByDurationAsync(int weeks);
        Task<Dictionary<string, double>?> GetPercentageTreatmentByNameByDurationAsync(int weeks, string name);
        Task<double?> GetHealPercentageByNameByDurationAsync(int weeks, string name);
        Task<double?> GetDiePercentageByNameByDurationAsync(int weeks, string name);
        Task<int?> GetAveragePandemicDurationAsync();
        Task<int?> GetAverageTreatmentDurationAsync(string name);
    }
}
