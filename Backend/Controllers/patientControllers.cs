using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Models;
using Services;

namespace Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class PatientController : ControllerBase
    {
        private readonly IPatientService _patientService;

        public PatientController(IPatientService patientService)
        {
            _patientService = patientService;
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
            var hospitalId = User.FindFirst("HospitalId")?.Value;
            if (string.IsNullOrEmpty(hospitalId))
                return Unauthorized("L'utilisateur n'est pas lié à un hôpital.");

            var patient = await _patientService.GetAllPatientsAsync();
            if (patient.Count == 0)
                return Ok(new { });
            return Ok(patient);
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
            var hospitalId = User.FindFirst("HospitalId")?.Value;
            if (string.IsNullOrEmpty(hospitalId))
                return Unauthorized("L'utilisateur n'est pas lié à un hôpital.");

            var patient = await _patientService.GetPatientByIdAsync(id);
            if (patient == null)
                return NotFound();
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
            if (!ModelState.IsValid)
                return BadRequest(ModelState);
            try {
                var hospitalIdClaim = User.FindFirst("HospitalId")?.Value;
                if (string.IsNullOrEmpty(hospitalIdClaim))
                    return Unauthorized("L'utilisateur n'est pas lié à un hôpital.");
                if (!int.TryParse(hospitalIdClaim, out int hospitalId))
                    return BadRequest("L'ID de l'hôpital est invalide.");
                var createdPatient = await _patientService.CreatePatientAsync(model, hospitalId);
                return CreatedAtAction(nameof(GetPatient), new { id = createdPatient.Id }, createdPatient);
            } catch (KeyNotFoundException ex) {
                return NotFound(ex.Message);
            } catch (Exception ex) {
                return StatusCode(500, "Erreur interne du serveur : " + ex.Message);
            }
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
        public async Task<IActionResult> PutPatient(int id, [FromBody] Patient patient)
        {
            var hospitalIdClaim = User.FindFirst("HospitalIdHospitalId")?.Value;
            if (string.IsNullOrEmpty(hospitalIdClaim))
                return Unauthorized("L'utilisateur n'est pas lié à un hôpital.");
            if (id != patient.Id)
                return BadRequest("ID mismatch");

            var existingPatient = await _patientService.GetPatientByIdAsync(id);
            if (existingPatient == null)
                return NotFound();

            existingPatient.NomHopital = patient.NomHopital ?? existingPatient.NomHopital;
            existingPatient.Genre = patient.Genre ?? existingPatient.Genre;
            existingPatient.DateDeNaissance = patient.DateDeNaissance ?? existingPatient.DateDeNaissance;
            existingPatient.Taille = patient.Taille ?? existingPatient.Taille;
            existingPatient.Poids = patient.Poids ?? existingPatient.Poids;
            existingPatient.IMC = patient.IMC ?? existingPatient.IMC;
            existingPatient.Hospitalisation = patient.Hospitalisation ?? existingPatient.Hospitalisation;

            await _patientService.UpdatePatientAsync(existingPatient);
            return Ok(existingPatient);
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
            var hospitalIdClaim = User.FindFirst("HospitalIdHospitalId")?.Value;
            if (string.IsNullOrEmpty(hospitalIdClaim))
                return Unauthorized("L'utilisateur n'est pas lié à un hôpital.");
            var existingPatient = await _patientService.GetPatientByIdAsync(id);
            if (existingPatient == null)
                return NotFound();

            var success = await _patientService.DeletePatientAsync(id);
            if (!success)
                return StatusCode(StatusCodes.Status500InternalServerError, "Error deleting Patient.");
            return NoContent();
        }
    }
}
