using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.AspNetCore.Authorization;
using Models;
using Services;

namespace Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class HospitalisationController : ControllerBase
    {
        private readonly IHospitalisationService _hospitalisationService;

        public HospitalisationController(IHospitalisationService hospitalisationService)
        {
            _hospitalisationService = hospitalisationService;
        }


        /// <summary>
        /// Gets all hospitalisations
        /// </summary>
        /// <returns>A list of hospitalisations</returns>
        /// <response code="200">Returns the list of hospitalisations</response>
        [HttpGet]
        [Authorize]
        [ProducesResponseType(StatusCodes.Status200OK)]
        public async Task<IActionResult> GetHospitalisations()
        {
            var hospitalisation = await _hospitalisationService.GetAllHospitalisationAsync();
            if (hospitalisation.Count == 0)
                return Ok(new { });
            return Ok(hospitalisation);
        }

        /// <summary>
        /// Get a specific hospitalisation by ID
        /// </summary>
        /// <param name="id">Hospitalisation ID</param>
        /// <returns>The requested hospitalisation</returns>
        /// <response code="200">Returns the hospitalisation</response>
        /// <response code="404">If the hospitalisation is not found</response>
        [HttpGet("{id}")]
        [Authorize]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        public async Task<IActionResult> GetHospitalisation(int id)
        {    
            var hospitalisation = await _hospitalisationService.GetHospitalisationByIdAsync(id);
            if (hospitalisation == null)
                return NotFound();
            return Ok(hospitalisation);
        }

        /// <summary>
        /// Updates an existing hospitalisation
        /// </summary>
        /// <param name="id">Hospitalisation ID</param>
        /// <param name="hospitalisation">The updated hospitalisation</param>
        /// <response code="204">If the update was successful</response>
        /// <response code="400">If the ID in the URL and the hospitalisation ID do not match</response>
        /// <response code="404">If the hospitalisation is not found</response>
        [HttpPut("{id}")]
        [Authorize]
        [ProducesResponseType(StatusCodes.Status204NoContent)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        public async Task<IActionResult> PutHospitalisation(int id, [FromBody] Hospitalisation hospitalisation)
        {
            if (id != hospitalisation.Id)
                return BadRequest("ID mismatch");

            var existingHospitalisation = await _hospitalisationService.GetHospitalisationByIdAsync(id);
            if (existingHospitalisation == null)
                return NotFound();

            existingHospitalisation.DateHospitalisation = hospitalisation.DateHospitalisation ?? existingHospitalisation.DateHospitalisation;
            existingHospitalisation.HospitalisationRéa = hospitalisation.HospitalisationRéa ?? existingHospitalisation.HospitalisationRéa;
            existingHospitalisation.DateHospitalisationRéa = hospitalisation.DateHospitalisationRéa ?? existingHospitalisation.DateHospitalisationRéa;
            existingHospitalisation.TypeDeService = hospitalisation.TypeDeService ?? existingHospitalisation.TypeDeService;
            existingHospitalisation.ModalitéEntrée = hospitalisation.ModalitéEntrée ?? existingHospitalisation.ModalitéEntrée;

            await _hospitalisationService.UpdateHospitalisationAsync(existingHospitalisation);
            return Ok(existingHospitalisation);
        }

        /// <summary>
        /// Deletes a specific hospitalisation
        /// </summary>
        /// <param name="id">Hospitalisation ID</param>
        /// <response code="204">If the hospitalisation was successfully deleted</response>
        /// <response code="404">If the hospitalisation is not found</response>
        [HttpDelete("{id}")]
        [Authorize]
        [ProducesResponseType(StatusCodes.Status204NoContent)]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        public async Task<IActionResult> DeleteHospitalisation(int id)
        {
            var existingHospitalisation = await _hospitalisationService.GetHospitalisationByIdAsync(id);
            if (existingHospitalisation == null)
                return NotFound();

            var success = await _hospitalisationService.DeleteHospitalisationAsync(id);
            if (!success)
                return StatusCode(StatusCodes.Status500InternalServerError, "Error deleting hospitalisation.");
            return NoContent();
        }
    }
}
