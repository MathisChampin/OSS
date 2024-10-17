using System.Collections.Generic;
using System.Threading.Tasks;
using Repositories;
using Models;
using Microsoft.EntityFrameworkCore.Infrastructure;

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
    }
}
