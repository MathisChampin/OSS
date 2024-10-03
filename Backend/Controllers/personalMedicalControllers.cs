using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
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
    }
}
