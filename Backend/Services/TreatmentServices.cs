using System.Collections.Generic;
using System.Threading.Tasks;
using Repositories;
using Models;
using Microsoft.EntityFrameworkCore.Infrastructure;
using System.Runtime.CompilerServices;

namespace Services
{
    public class TreatmentService : ITreatmentService
    {
        private readonly ITreatmentRepository _treatmentRepository;

        public TreatmentService(ITreatmentRepository treatmentRepository)
        {
            _treatmentRepository = treatmentRepository;
        }

        public async Task<List<Treatment>> GetAllTreatmentsAsync()
        {
            return await _treatmentRepository.GetAllAsync();
        }
        public async Task<List<Treatment>> GetTreatmentByNameAsync(string name)
        {
            return await _treatmentRepository.GetByNameAsync(name);
        }
        public async Task<Treatment> CreateTreatmentAsync(Treatment model)
        {   
            if (model.DateStartTreatment.HasValue)
                model.DateStartTreatment = DateTime.SpecifyKind(model.DateStartTreatment.Value, DateTimeKind.Utc);
            if (model.DateEndTreatment.HasValue)
                model.DateEndTreatment = DateTime.SpecifyKind(model.DateEndTreatment.Value, DateTimeKind.Utc);

            var createdTreatment = await _treatmentRepository.CreateAsync(model);
            return createdTreatment;
        }
        public async Task<Object?> GetTreatmentStatisticsByNameCurrentAsync(string name)
        {
            var treatment = await _treatmentRepository.GetByNameAsync(name);

            if (treatment == null || !treatment.Any())
            {
                return null;
            }

            var totalPatients = treatment.Count();
            var CurrentPatients = treatment.Count(t => t.Status == 0);
            var stats = (double)CurrentPatients / totalPatients * 100;

            return stats;
        }
        public async Task<Object?> GetTreatmentStatisticsByNameDieAsync(string name)
        {
            var treatment = await _treatmentRepository.GetByNameAsync(name);

            if (treatment == null || !treatment.Any())
            {
                return null;
            }

            var totalPatients = treatment.Count();
            var DiePatients = treatment.Count(t => t.Status == 1);
            var stats = (double)DiePatients / totalPatients * 100;

            return stats;
        }
        public async Task<Object?> GetTreatmentStatisticsByNameHealAsync(string name)
        {
            var treatment = await _treatmentRepository.GetByNameAsync(name);

            if (treatment == null || !treatment.Any())
            {
                return null;
            }

            var totalPatients = treatment.Count();
            var DiePatients = treatment.Count(t => t.Status == 2);
            var stats = (double)DiePatients / totalPatients * 100;

            return stats;
        }

        public async Task<Object?> GetTreatmentStatisticsByNameAsync(string name)
        {
            var speTreatment = await _treatmentRepository.GetByNameAsync(name);
            var treatment = await _treatmentRepository.GetAllAsync();
    
            if (treatment == null || !treatment.Any() || speTreatment == null || !speTreatment.Any())
            {
                return null;
            }

            var totalPatients = treatment.Count();
            var SpePatient = speTreatment.Count();
            var stats = (double)SpePatient / totalPatients * 100;

            return stats;
        }

        public async Task<Object?> GetTreatmentStatisticsHealAsync()
        {
            var treatment = await _treatmentRepository.GetAllAsync();
            if (treatment == null || !treatment.Any())
            {
                return null;
            }

            var totalPatients = treatment.Count();
            var healPatients = treatment.Count(t => t.Status == 2);
            var stats = (double)healPatients / totalPatients * 100;

            return stats;
        }

        public async Task<Object?> GetTreatmentStatisticsDieAsync()
        {
            var treatment = await _treatmentRepository.GetAllAsync();
            if (treatment == null || !treatment.Any())
            {
                return null;
            }

            var totalPatients = treatment.Count();
            var DiePatients = treatment.Count(t => t.Status == 1);
            var stats = (double)DiePatients / totalPatients * 100;

            return stats;
        }

        public async Task<Object?> GetTreatmentStatisticsCurrentAsync()
        {
            var treatment = await _treatmentRepository.GetAllAsync();

            if (treatment == null || !treatment.Any())
            {
                return null;
            }

            var totalPatients = treatment.Count();
            var currentPatients = treatment.Count(t => t.Status == 0);
            var stats = (double)currentPatients / totalPatients * 100;

            return stats;
        }

        public async Task<Object?> GetPercentageOfCurrentPatientsByTreatmentAsync(string name)
        {
            var allTreatment = await _treatmentRepository.GetAllAsync();
            var speTreatment = await _treatmentRepository.GetByNameAsync(name);

            if (allTreatment == null || !allTreatment.Any() || speTreatment == null || !speTreatment.Any())
            {
                return null;
            }

            var totalPatients = allTreatment.Count();
            var currentPatients = speTreatment.Count(t => t.Status == 0);
            var stats = (double)currentPatients / totalPatients * 100;

            return stats;
        }

        public async Task<Object?> GetPercentageOfDiePatientsByTreatmentAsync(string name)
        {
            var allTreatment = await _treatmentRepository.GetAllAsync();
            var speTreatment = await _treatmentRepository.GetByNameAsync(name);

            if (allTreatment == null || !allTreatment.Any() || speTreatment == null || !speTreatment.Any())
            {
                return null;
            }

            var totalPatients = allTreatment.Count();
            var currentPatients = speTreatment.Count(t => t.Status == 1);
            var stats = (double)currentPatients / totalPatients * 100;

            return stats;
        }

        public async Task<Object?> GetPercentageOfHealPatientsByTreatmentAsync(string name)
        {
            var allTreatment = await _treatmentRepository.GetAllAsync();
            var speTreatment = await _treatmentRepository.GetByNameAsync(name);

            if (allTreatment == null || !allTreatment.Any() || speTreatment == null || !speTreatment.Any())
            {
                return null;
            }

            var totalPatients = allTreatment.Count();
            var currentPatients = speTreatment.Count(t => t.Status == 2);
            var stats = (double)currentPatients / totalPatients * 100;

            return stats;
        }
        public async Task<KeyValuePair<string, double>?> GetBestTreatmentAsync()
        {
            var allTreatments = await _treatmentRepository.GetAllAsync();

            if (allTreatments == null || !allTreatments.Any())
                return null;

            var bestTreatment = allTreatments
                .Where(t => !string.IsNullOrEmpty(t.NameTreatment))
                .GroupBy(t => t.NameTreatment)
                .Select(group => new 
                {
                    TreatmentName = group.Key!,
                    TotalPatients = group.Count(),
                    HealedPatients = group.Count(t => t.Status == 2)
                })
                .Select(t => new
                {
                    t.TreatmentName,
                    HealPercentage = (double)t.HealedPatients / t.TotalPatients * 100
                })
                .OrderByDescending(t => t.HealPercentage)
                .FirstOrDefault();
            
            if (bestTreatment != null)
                return new KeyValuePair<string, double>(bestTreatment.TreatmentName, bestTreatment.HealPercentage);
            return null;
        }
        public async Task<KeyValuePair<string, double>?> GetLeastTreatmentAsync()
        {
            var allTreatments = await _treatmentRepository.GetAllAsync();

            if (allTreatments == null || !allTreatments.Any())
                return null;

            var leastTreatment = allTreatments
                .Where(t => !string.IsNullOrEmpty(t.NameTreatment))
                .GroupBy(t => t.NameTreatment)
                .Select(group => new 
                {
                    TreatmentName = group.Key!,
                    TotalPatients = group.Count(),
                    DiePatients = group.Count(t => t.Status == 1)
                })
                .Select(t => new
                {
                    t.TreatmentName,
                    DiePercentage = (double)t.DiePatients / t.TotalPatients * 100
                })
                .OrderByDescending(t => t.DiePercentage)
                .FirstOrDefault();
            
            if (leastTreatment != null)
                return new KeyValuePair<string, double>(leastTreatment.TreatmentName, leastTreatment.DiePercentage);
            return null;
        }
        public async Task<KeyValuePair<string, double>?> GetBestTreatmentByDurationAsync(int weeks)
        {
            var allTreatments = await _treatmentRepository.GetAllAsync();

            if (allTreatments == null || !allTreatments.Any())
                return null;

            int days = weeks * 7;
            
            var treatmentStats = allTreatments
                .Where(t => t.DateStartTreatment.HasValue && t.DateEndTreatment.HasValue)
                .Select(t => new 
                {
                    t.NameTreatment,
                    DurationInDays = (t.DateEndTreatment.HasValue && t.DateStartTreatment.HasValue)
                        ? (t.DateEndTreatment.Value - t.DateStartTreatment.Value).TotalDays
                        : 0,
                    Healed = t.Status == 2
                })
                .Where(t => t.DurationInDays >= days && t.DurationInDays < days + 7)
                .GroupBy(t => t.NameTreatment)
                .Select(group => new
                {
                    TreatmentName = group.Key!,
                    TotalTreatments = group.Count(),
                    HealedCount = group.Count(t => t.Healed),
                    HealPercentage = (double)group.Count(t => t.Healed) / group.Count() * 100
                })
                .OrderByDescending(t => t.HealPercentage)
                .FirstOrDefault();
            
            if (treatmentStats != null)
                return new KeyValuePair<string, double>(treatmentStats.TreatmentName, treatmentStats.HealPercentage);
            return null;
        }

        public async Task<KeyValuePair<string, double>?> GetLeastTreatmentByDurationAsync(int weeks)
        {
            var allTreatments = await _treatmentRepository.GetAllAsync();

            if (allTreatments == null || !allTreatments.Any())
                return null;

            int days = weeks * 7;
            
            var treatmentStats = allTreatments
                .Where(t => t.DateStartTreatment.HasValue && t.DateEndTreatment.HasValue)
                .Select(t => new 
                {
                    t.NameTreatment,
                    DurationInDays = (t.DateEndTreatment.HasValue && t.DateStartTreatment.HasValue)
                        ? (t.DateEndTreatment.Value - t.DateStartTreatment.Value).TotalDays
                        : 0,
                    Die = t.Status == 1
                })
                .Where(t => t.DurationInDays >= days && t.DurationInDays < days + 7)
                .GroupBy(t => t.NameTreatment)
                .Select(group => new
                {
                    TreatmentName = group.Key!,
                    TotalTreatments = group.Count(),
                    DieCount = group.Count(t => t.Die),
                    DiePercentage = (double)group.Count(t => t.Die) / group.Count() * 100
                })
                .OrderByDescending(t => t.DiePercentage)
                .FirstOrDefault();
            
            if (treatmentStats != null)
                return new KeyValuePair<string, double>(treatmentStats.TreatmentName, treatmentStats.DiePercentage);
            return null;
        }

        public async Task<Dictionary<string, double>?> GetPercentageTreatmentByNameByDurationAsync(int weeks, string name)
        {
            var speTreatment = await _treatmentRepository.GetByNameAsync(name);

            if (speTreatment == null || !speTreatment.Any())
                return null;

            int days = weeks * 7;

            var treatmentStats = speTreatment
                .Where(t => t.DateStartTreatment.HasValue && t.DateEndTreatment.HasValue)
                .Select(t => new 
                {
                    t.Status,
                    DurationInDays = (t.DateEndTreatment.HasValue && t.DateStartTreatment.HasValue)
                        ? (t.DateEndTreatment.Value - t.DateStartTreatment.Value).TotalDays
                        : 0,
                })
                .Where(t => t.DurationInDays >= days && t.DurationInDays < days + 7)
                .ToList();

            if (!treatmentStats.Any())
                return null;

            int totalTreatments = treatmentStats.Count();
            int healedCount = treatmentStats.Count(t => t.Status == 2);
            int deceasedCount = treatmentStats.Count(t => t.Status == 1);

            double healPercentage = (totalTreatments > 0) ? (double)healedCount / totalTreatments * 100 : 0;
            double diePercentage = (totalTreatments > 0) ? (double)deceasedCount / totalTreatments * 100 : 0;

            return new Dictionary<string, double>
            {
                { "heal", healPercentage },
                { "die", diePercentage }
            };
        }
        public async Task<double?> GetHealPercentageByNameByDurationAsync(int weeks, string name)
        {
            var speTreatment = await _treatmentRepository.GetByNameAsync(name);

            if (speTreatment == null || !speTreatment.Any())
                return null;

            int days = weeks * 7;

            var treatmentStats = speTreatment
                .Where(t => t.DateStartTreatment.HasValue && t.DateEndTreatment.HasValue)
                .Select(t => new 
                {
                    t.Status,
                    DurationInDays = (t.DateEndTreatment.HasValue && t.DateStartTreatment.HasValue)
                        ? (t.DateEndTreatment.Value - t.DateStartTreatment.Value).TotalDays
                        : 0,
                })
                .Where(t => t.DurationInDays >= days && t.DurationInDays < days + 7)
                .ToList();

            if (!treatmentStats.Any())
                return null;

            int totalTreatments = treatmentStats.Count();
            int healedCount = treatmentStats.Count(t => t.Status == 2); // Statut 2 : Guéri

            double healPercentage = (totalTreatments > 0) ? (double)healedCount / totalTreatments * 100 : 0;

            return healPercentage;
        }
        public async Task<double?> GetDiePercentageByNameByDurationAsync(int weeks, string name)
        {
            var speTreatment = await _treatmentRepository.GetByNameAsync(name);

            if (speTreatment == null || !speTreatment.Any())
                return null;

            int days = weeks * 7;

            var treatmentStats = speTreatment
                .Where(t => t.DateStartTreatment.HasValue && t.DateEndTreatment.HasValue)
                .Select(t => new 
                {
                    t.Status,
                    DurationInDays = (t.DateEndTreatment.HasValue && t.DateStartTreatment.HasValue)
                        ? (t.DateEndTreatment.Value - t.DateStartTreatment.Value).TotalDays
                        : 0,
                })
                .Where(t => t.DurationInDays >= days && t.DurationInDays < days + 7)
                .ToList();

            if (!treatmentStats.Any())
                return null;

            int totalTreatments = treatmentStats.Count();
            int deceasedCount = treatmentStats.Count(t => t.Status == 1); // Statut 1 : Décédé

            double diePercentage = (totalTreatments > 0) ? (double)deceasedCount / totalTreatments * 100 : 0;

            return diePercentage;
        }
        public async Task<int?> GetAveragePandemicDurationAsync()
        {
            var allTreatments = await _treatmentRepository.GetAllAsync();

            if (allTreatments == null || !allTreatments.Any())
                return null;

            var validTreatments = allTreatments
                .Where(t => t.DateStartTreatment.HasValue && t.DateEndTreatment.HasValue)
                .ToList();

            if (!validTreatments.Any())
                return null;

            
            var pandemicStartDate = validTreatments.Min(t => t.DateStartTreatment ?? DateTime.MinValue);
            var pandemicEndDate = validTreatments.Max(t => t.DateEndTreatment ?? DateTime.MaxValue);

            var totalPandemicDurationInDays = (pandemicEndDate - pandemicStartDate).TotalDays;

            return (int)totalPandemicDurationInDays;
        }
        public async Task<int?> GetAverageTreatmentDurationAsync(string name)
        {
            var speTreatments = await _treatmentRepository.GetByNameAsync(name);

            if (speTreatments == null || !speTreatments.Any())
                return null;

            var validTreatments = speTreatments
                .Where(t => t.DateStartTreatment.HasValue && t.DateEndTreatment.HasValue)
                .ToList();

            if (!validTreatments.Any())
                return null;

            var totalTreatmentDurationInDays = validTreatments
                .Select(t => (t.DateEndTreatment.HasValue && t.DateStartTreatment.HasValue)
                        ? (t.DateEndTreatment.Value - t.DateStartTreatment.Value).TotalDays
                        : 0)
                .Sum();

            var averageTreatmentDurationInDays = totalTreatmentDurationInDays / speTreatments.Count;

            return (int)averageTreatmentDurationInDays;
        }
    }
}
