using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.AspNetCore.Authorization;
using Models;
using Services;

namespace Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class PNoMedicalController : ControllerBase
    {
        private readonly IPNoMedicalService _noMedicalService;

        public PNoMedicalController(IPNoMedicalService noMedicalService)
        {
            _noMedicalService = noMedicalService;
        }

        /// <summary>
        /// Gets all personal non medical
        /// </summary>
        /// <returns>A list of personal non medical</returns>
        /// <response code="200">Returns the list of personal non medical</response>
        [HttpGet]
        [Authorize]
        [ProducesResponseType(StatusCodes.Status200OK)]
        public async Task<IActionResult> GetPMedicals()
        {
            var noMedical = await _noMedicalService.GetAllPNoMedicalsAsync();
            if (noMedical.Count == 0)
                return Ok(new { });
            return Ok(noMedical);
        }
    
        /// <summary>
        /// Gets a specific personal non medical by ID
        /// </summary>
        /// <param name="id">Personal non medical ID</param>
        /// <returns>The requested personal non medical</returns>
        /// <response code="200">Returns the personal non medical</response>
        /// <response code="404">If the personal non medical is not found</response>
        [HttpGet("{id}")]
        [Authorize]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        public async Task<IActionResult> GetPNoMedical(int id)
        {
            var pNoMedical = await _noMedicalService.GetPNoMedicalByIdAsync(id);
            if (pNoMedical == null)
                return NotFound();
            return Ok(pNoMedical);
        }

        /// <summary>
        /// Creates a new personal non medical along with their hospitalisation
        /// </summary>
        /// <param name="model">Personal non medical data</param>
        /// <returns>The created personal non medical</returns>
        /// <response code="201">Returns the created personal non medical</response>
        /// <response code="404">If the hospital is not found</response>
        [HttpPost]
        [Authorize]
        [ProducesResponseType(StatusCodes.Status201Created)]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        public async Task<IActionResult> PostPNoMedical([FromBody] PNoMedical model)
        {
            if (!ModelState.IsValid)
                return BadRequest(ModelState);
            try {
                var hospitalIdClaim = User.FindFirst("HospitalId")?.Value;
                if (string.IsNullOrEmpty(hospitalIdClaim))
                    return Unauthorized("L'utilisateur n'est pas lié à un hôpital.");
                if (!int.TryParse(hospitalIdClaim, out int hospitalId))
                    return BadRequest("L'ID de l'hôpital est invalide.");
                var createdPMedical = await _noMedicalService.CreatePNoMedicalAsync(model, hospitalId);
                return CreatedAtAction(nameof(GetPMedicals), new { id = createdPMedical.Id }, createdPMedical);
            } catch (KeyNotFoundException ex) {
                return NotFound(ex.Message);
            } catch (Exception ex) {
                return StatusCode(500, "Erreur interne du serveur : " + ex.Message);
            }
        }

        /// <summary>
        /// Updates an existing personal non medical
        /// </summary>
        /// <param name="id">Personal non medical ID</param>
        /// <param name="personal non medical">Updated personal non medical data</param>
        /// <response code="204">If the update is successful</response>
        /// <response code="400">If the ID in the URL does not match the personal medical ID</response>
        /// <response code="404">If the personal non medical is not found</response>
        [HttpPut("{id}")]
        [Authorize]
        [ProducesResponseType(StatusCodes.Status204NoContent)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        public async Task<IActionResult> PutPatient(int id, [FromBody] PNoMedical noMedical)
        {
            if (id != noMedical.Id)
                return BadRequest("ID mismatch");

            var existingNoMedical = await _noMedicalService.GetPNoMedicalByIdAsync(id);
            if (existingNoMedical == null)
                return NotFound();

            existingNoMedical.NbIdeDay = noMedical.NbIdeDay ?? existingNoMedical.NbIdeDay;
            existingNoMedical.NbIdeNight = noMedical.NbIdeNight ?? existingNoMedical.NbIdeNight;
            existingNoMedical.NbIdeDayUsc = noMedical.NbIdeDayUsc ?? existingNoMedical.NbIdeDayUsc;
            existingNoMedical.NbIdeNightUsc = noMedical.NbIdeNightUsc ?? existingNoMedical.NbIdeNightUsc;
            existingNoMedical.NbAsDay = noMedical.NbAsDay ?? existingNoMedical.NbAsDay;
            existingNoMedical.NbAsNight = noMedical.NbAsNight ?? existingNoMedical.NbAsNight;
            existingNoMedical.NbAsDayUsc = noMedical.NbAsDayUsc ?? existingNoMedical.NbAsDayUsc;
            existingNoMedical.NbAsNightUsc = noMedical.NbAsNightUsc ?? existingNoMedical.NbAsNightUsc;
            existingNoMedical.NbExecDay = noMedical.NbExecDay ?? existingNoMedical.NbExecDay;
            existingNoMedical.NbIdeSick = noMedical.NbIdeSick ?? existingNoMedical.NbIdeSick;
            existingNoMedical.NbAsSick = noMedical.NbAsSick ?? existingNoMedical.NbAsSick;
            existingNoMedical.NbAppIde = noMedical.NbAppIde ?? existingNoMedical.NbAppIde;
            existingNoMedical.NbAppIde = noMedical.NbAppIde ?? existingNoMedical.NbAppIde;
    
            await _noMedicalService.UpdatePNoMedicalAsync(existingNoMedical);
            return Ok(existingNoMedical);
        }

        /// <summary>
        /// Deletes a specific personal non medical
        /// </summary>
        /// <param name="id">Personal non medical ID</param>
        /// <response code="204">If the personal non medical is successfully deleted</response>
        /// <response code="404">If the personal non medical is not found</response>
        [HttpDelete("{id}")]
        [Authorize]
        [ProducesResponseType(StatusCodes.Status204NoContent)]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        public async Task<IActionResult> DeletePatient(int id)
        {
            var existingNoMedical = await _noMedicalService.GetPNoMedicalByIdAsync(id);
            if (existingNoMedical == null)
                return NotFound();

            var success = await _noMedicalService.DeletePNoMedicalAsync(id);
            if (!success)
                return StatusCode(StatusCodes.Status500InternalServerError, "Error deleting Personal medical.");
            return NoContent();
        }
    }
}
