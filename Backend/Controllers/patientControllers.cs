using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Models;
using Backend;

namespace Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class PatientController : ControllerBase
    {
        private readonly DataContext _context;

        public PatientController(DataContext context)
        {
            _context = context;
        }

        /// <summary>
        /// Gets all patients
        /// </summary>
        /// <returns>A list of patients</returns>
        /// <response code="200">Returns the list of patients</response>
        [HttpGet]
        [ProducesResponseType(StatusCodes.Status200OK)]
        public async Task<IActionResult> GetPatients()
        {
            var patients = await _context.Patients
                .Include(p => p.Hospitalisation)
                .ToListAsync();

            if (patients.Count == 0)
            {
                return Ok(new { });
            }

            return Ok(patients);
        }


        /// <summary>
        /// Gets a specific patient by ID
        /// </summary>
        /// <param name="id">Patient ID</param>
        /// <returns>The requested patient</returns>
        /// <response code="200">Returns the patient</response>
        /// <response code="404">If the patient is not found</response>
        [HttpGet("{id}")]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        public async Task<IActionResult> GetPatient(int id)
        {
            var patient = await _context.Patients
                .Include(p => p.Hospitalisation)
                .FirstOrDefaultAsync(u => u.Id == id);

            if (patient == null)
            {
                return NotFound();
            }
            return Ok(patient);
        }

        /// <summary>
        /// Creates a new patient along with their hospitalisation
        /// </summary>
        /// <param name="model">Patient and hospitalisation data</param>
        /// <returns>The created patient</returns>
        /// <response code="201">Returns the created patient</response>
        /// <response code="404">If the hospital is not found</response>
        [HttpPost]
        [ProducesResponseType(StatusCodes.Status201Created)]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        public async Task<IActionResult> PostPatient([FromBody] PatientWithHospitalisation model)
        {
            var hospital = await _context.Hospitals
                .FirstOrDefaultAsync(h => h.NomHopital == model.Patient.NomHopital);

            if (hospital == null)
                return NotFound("L'hôpital n'existe pas dans la base de données.");

            model.Patient.HospitalId = hospital.Id;
            model.Patient.DateDeNaissance = DateTime.SpecifyKind(model.Patient.DateDeNaissance, DateTimeKind.Utc);
            model.Patient.IMC = model.Patient.SetImc(model.Patient.Taille, model.Patient.Poids);
            _context.Patients.Add(model.Patient);
            await _context.SaveChangesAsync();

            model.Hospitalisation.PatientId = model.Patient.Id;
            model.Hospitalisation.DateHospitalisation = DateTime.SpecifyKind(model.Hospitalisation.DateHospitalisation, DateTimeKind.Utc);
            model.Hospitalisation.DateHospitalisationRéa = DateTime.SpecifyKind(model.Hospitalisation.DateHospitalisationRéa, DateTimeKind.Utc);
            _context.Hospitalisations.Add(model.Hospitalisation);
            await _context.SaveChangesAsync();

            hospital.Patients.Add(model.Patient);
            await _context.SaveChangesAsync();

            return CreatedAtAction(nameof(GetPatient), new { id = model.Patient.Id }, model.Patient);
        }


        /// <summary>
        /// Updates an existing patient
        /// </summary>
        /// <param name="id">Patient ID</param>
        /// <param name="patient">Updated patient data</param>
        /// <response code="204">If the update is successful</response>
        /// <response code="400">If the ID in the URL does not match the patient ID</response>
        /// <response code="404">If the patient is not found</response>
        [HttpPut("{id}")]
        [ProducesResponseType(StatusCodes.Status204NoContent)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        public async Task<IActionResult> PutPatient(int id, Patient patient)
        {
            if (id != patient.Id)
            {
                return BadRequest();
            }

            _context.Entry(patient).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!PatientExists(id))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            return NoContent();
        }

        /// <summary>
        /// Deletes a specific patient
        /// </summary>
        /// <param name="id">Patient ID</param>
        /// <response code="204">If the patient is successfully deleted</response>
        /// <response code="404">If the patient is not found</response>
        [HttpDelete("{id}")]
        [ProducesResponseType(StatusCodes.Status204NoContent)]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        public async Task<IActionResult> DeletePatient(int id)
        {
            var patient = await _context.Patients.FindAsync(id);
            if (patient == null)
            {
                return NotFound();
            }

            _context.Patients.Remove(patient);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        private bool PatientExists(int id)
        {
            return _context.Patients.Any(e => e.Id == id);
        }
    }
}
