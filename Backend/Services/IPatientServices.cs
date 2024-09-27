using System.Collections.Generic;
using System.Threading.Tasks;
using Models;

namespace Services
{
    public interface IPatientService
    {
        Task<List<Patient>> GetAllPatientsAsync();
        Task<Patient?> GetPatientByIdAsync(int id);
        Task<Patient> CreatePatientAsync(PatientWithHospitalisation model);
        Task UpdatePatientAsync(Patient patient);
        Task<bool> DeletePatientAsync(int id);
    }
}
