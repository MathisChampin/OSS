using System.Collections.Generic;
using System.Threading.Tasks;
using Repositories;
using Models;
using Microsoft.EntityFrameworkCore.Infrastructure;

namespace Services
{
    public class PatientService : IPatientService
    {
        private readonly IPatientRepository _patientRepository;
        private readonly IHospitalRepository _hospitalRepository;
        private readonly IHospitalisationRepository _hospitalisationRepository;

        public PatientService(IPatientRepository patientRepository, IHospitalRepository hospitalRepository, IHospitalisationRepository hospitalisationRepository)
        {
            _patientRepository = patientRepository;
            _hospitalRepository = hospitalRepository;
            _hospitalisationRepository = hospitalisationRepository;
        }

        public async Task<List<Patient>> GetAllPatientsAsync()
        {
            return await _patientRepository.GetAllAsync();
        }

        public async Task<Patient?> GetPatientByIdAsync(int id)
        {
            return await _patientRepository.GetByIdAsync(id);
        }
        public async Task<Patient> CreatePatientAsync(PatientWithHospitalisation model)
        {
            if (string.IsNullOrWhiteSpace(model.Patient.NomHopital))
                throw new ArgumentException("Le nom de l'hôpital ne peut pas être nul ou vide.");
            var hospital = await _hospitalRepository.GetByNameAsync(model.Patient.NomHopital);
            if (hospital == null)
                throw new KeyNotFoundException("L'hôpital n'existe pas dans la base de données.");

            model.Patient.HospitalId = hospital.Id;
            
            if (model.Patient.DateDeNaissance.HasValue)
                model.Patient.DateDeNaissance = DateTime.SpecifyKind(model.Patient.DateDeNaissance.Value, DateTimeKind.Utc);
            model.Patient.IMC = model.Patient.SetImc(model.Patient.Taille, model.Patient.Poids);

            var createdPatient = await _patientRepository.CreateAsync(model.Patient);

            model.Hospitalisation.PatientId = createdPatient.Id;
            if (model.Hospitalisation.DateHospitalisation.HasValue)
                model.Hospitalisation.DateHospitalisation = DateTime.SpecifyKind(model.Hospitalisation.DateHospitalisation.Value, DateTimeKind.Utc);
            if (model.Hospitalisation.DateHospitalisationRéa.HasValue)
                model.Hospitalisation.DateHospitalisationRéa = DateTime.SpecifyKind(model.Hospitalisation.DateHospitalisationRéa.Value, DateTimeKind.Utc);

            await _hospitalisationRepository.CreateAsync(model.Hospitalisation);

            await _hospitalRepository.AddPatientToHospitalAsync(hospital, createdPatient);

            return createdPatient;
        }
        public async Task UpdatePatientAsync(Patient patient)
        {
            await _patientRepository.UpdateAsync(patient);
        }

        public async Task<bool> DeletePatientAsync(int id)
        {
            return await _patientRepository.DeleteAsync(id);
        }
    }
}
