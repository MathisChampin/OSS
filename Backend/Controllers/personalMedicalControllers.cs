using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.AspNetCore.Authorization;
using Models;
using Services;

namespace Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class PMedicalController : ControllerBase
    {
        private readonly IPMedicalService _pmedicalService;

        public PMedicalController(IPMedicalService pmedicalService)
        {
            _pmedicalService = pmedicalService;
        }

        /// <summary>
        /// Gets all personal medical
        /// </summary>
        /// <returns>A list of personal medical</returns>
        /// <response code="200">Returns the list of personal medical</response>
        [HttpGet]
        [Authorize]
        [ProducesResponseType(StatusCodes.Status200OK)]
        public async Task<IActionResult> GetPMedicals()
        {
            var hospitalId = User.FindFirst("HospitalId")?.Value;
            if (string.IsNullOrEmpty(hospitalId))
                return Unauthorized("L'utilisateur n'est pas lié à un hôpital.");

            var pmedical = await _pmedicalService.GetAllPMedicalsAsync();
            if (pmedical.Count == 0)
                return Ok(new { });
            return Ok(pmedical);
        }

        /// <summary>
        /// Gets a specific personal medical by ID
        /// </summary>
        /// <param name="id">Personal medical ID</param>
        /// <returns>The requested personal medical</returns>
        /// <response code="200">Returns the personal medical</response>
        /// <response code="404">If the personal medical is not found</response>
        [HttpGet("{id}")]
        [Authorize]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        public async Task<IActionResult> GetPMedical(int id)
        {
            var hospitalId = User.FindFirst("HospitalId")?.Value;
            if (string.IsNullOrEmpty(hospitalId))
                return Unauthorized("L'utilisateur n'est pas lié à un hôpital.");
            var pmedical = await _pmedicalService.GetPMedicalByIdAsync(id);
            if (pmedical == null)
                return NotFound();
            return Ok(pmedical);
        }

        /// <summary>
        /// Creates a new personal medical along with their hospitalisation
        /// </summary>
        /// <param name="model">Personal data</param>
        /// <returns>The created personal medical</returns>
        /// <response code="201">Returns the created personal medical</response>
        /// <response code="404">If the hospital is not found</response>
        [HttpPost]
        [Authorize]
        [ProducesResponseType(StatusCodes.Status201Created)]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        public async Task<IActionResult> PostPMedical([FromBody] PMedical model)
        {
            if (!ModelState.IsValid)
                return BadRequest(ModelState);
            try {
                var hospitalIdClaim = User.FindFirst("HospitalIdHospitalId")?.Value;
                if (string.IsNullOrEmpty(hospitalIdClaim))
                    return Unauthorized("L'utilisateur n'est pas lié à un hôpital.");
                if (!int.TryParse(hospitalIdClaim, out int hospitalId))
                    return BadRequest("L'ID de l'hôpital est invalide.");
                var createdPMedical = await _pmedicalService.CreatePMedicalAsync(model, hospitalId);
                return CreatedAtAction(nameof(GetPMedicals), new { id = createdPMedical.Id }, createdPMedical);
            } catch (KeyNotFoundException ex) {
                return NotFound(ex.Message);
            } catch (Exception ex) {
                return StatusCode(500, "Erreur interne du serveur : " + ex.Message);
            }
        }

        /// <summary>
        /// Updates an existing personal medical
        /// </summary>
        /// <param name="id">Personal medical ID</param>
        /// <param name="personal medical">Updated personal medical data</param>
        /// <response code="204">If the update is successful</response>
        /// <response code="400">If the ID in the URL does not match the personal medical ID</response>
        /// <response code="404">If the personal medical is not found</response>
        [HttpPut("{id}")]
        [Authorize]
        [ProducesResponseType(StatusCodes.Status204NoContent)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        public async Task<IActionResult> PutPatient(int id, [FromBody] PMedical pmedical)
        {
            var hospitalIdClaim = User.FindFirst("HospitalIdHospitalId")?.Value;
            
            if (string.IsNullOrEmpty(hospitalIdClaim))
                return Unauthorized("L'utilisateur n'est pas lié à un hôpital.");
            if (id != pmedical.Id)
                return BadRequest("ID mismatch");

            var existingPMedical = await _pmedicalService.GetPMedicalByIdAsync(id);
            if (existingPMedical == null)
                return NotFound();

            existingPMedical.NbDoctorUniv = pmedical.NbDoctorUniv ?? existingPMedical.NbDoctorUniv;
            existingPMedical.NbDoctorHosp = pmedical.NbDoctorHosp ?? existingPMedical.NbDoctorHosp;
            existingPMedical.NbInternal = pmedical.NbInternal ?? existingPMedical.NbInternal;
            existingPMedical.NbDoctor = pmedical.NbDoctor ?? existingPMedical.NbDoctor;
            existingPMedical.NbPersonalAbs = pmedical.NbPersonalAbs ?? existingPMedical.NbPersonalAbs;

            await _pmedicalService.UpdatePMedicalAsync(existingPMedical);
            return Ok(existingPMedical);
        }

        /// <summary>
        /// Deletes a specific personal medical
        /// </summary>
        /// <param name="id">Personal medical ID</param>
        /// <response code="204">If the personal medical is successfully deleted</response>
        /// <response code="404">If the personal medical is not found</response>
        [HttpDelete("{id}")]
        [Authorize]
        [ProducesResponseType(StatusCodes.Status204NoContent)]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        public async Task<IActionResult> DeletePatient(int id)
        {
            var hospitalIdClaim = User.FindFirst("HospitalIdHospitalId")?.Value;
            
            if (string.IsNullOrEmpty(hospitalIdClaim))
                return Unauthorized("L'utilisateur n'est pas lié à un hôpital.");
            var existingPMedical = await _pmedicalService.GetPMedicalByIdAsync(id);
            if (existingPMedical == null)
                return NotFound();

            var success = await _pmedicalService.DeletePMedicalAsync(id);
            if (!success)
                return StatusCode(StatusCodes.Status500InternalServerError, "Error deleting Personal medical.");
            return NoContent();
        }
    }
}
