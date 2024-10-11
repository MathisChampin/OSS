using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Models;
using Services;

namespace Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class HospitalController : ControllerBase
    {
        private readonly IHospitalService _hospitalService;

        public HospitalController(IHospitalService hospitalService)
        {
            _hospitalService = hospitalService;
        }

        /// <summary>
        /// Gets all hospitals
        /// </summary>
        /// <returns>A list of hospitals</returns>
        /// <response code="200">Returns the list of hospitals</response>
        [HttpGet]
        [ProducesResponseType(StatusCodes.Status200OK)] 
        public async Task<IActionResult> GetHospitals()
        {
            var hospitals = await _hospitalService.GetAllHospitalsAsync();
            if (hospitals.Count == 0)
                return Ok(new { });
            return Ok(hospitals);
        }


        /// <summary>
        /// Gets a specific hospital by ID
        /// </summary>
        /// <param name="id">Hospital ID</param>
        /// <returns>The requested hospital</returns>
        /// <response code="200">Returns the hospital</response>
        /// <response code="404">If the hospital is not found</response>
        [HttpGet("{id}")]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        public async Task<IActionResult> GetHospital(int id)
        {
            var hospital = await _hospitalService.GetHospitalByIdAsync(id);
            if (hospital == null)
                return NotFound();
            return Ok(hospital);
        }

        /// <summary>
        /// Creates a new hospital
        /// </summary>
        /// <param name="hospital">The hospital to create</param>
        /// <returns>The created hospital</returns>
        /// <response code="201">Returns the created hospital</response>
        /// <response code="400">If the hospital is invalid</response>
        [HttpPost]
        [ProducesResponseType(StatusCodes.Status201Created)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        public async Task<IActionResult> CreateHospital([FromBody] Hospital hospital)
        {
            if (!ModelState.IsValid)
                return BadRequest(ModelState);

            try {
                var createdHospital = await _hospitalService.CreateHospitalAsync(hospital);
                return CreatedAtAction(nameof(GetHospital), new { id = createdHospital.Id }, createdHospital);
            } catch (InvalidOperationException ex) {
                return Conflict(ex.Message);
            }
        }

        /// <summary>
        /// Updates an existing hospital
        /// </summary>
        /// <param name="id">Hospital ID</param>
        /// <param name="hospital">The updated hospital</param>
        /// <response code="204">If the update was successful</response>
        /// <response code="400">If the hospital is invalid</response>
        /// <response code="404">If the hospital is not found</response>
        [HttpPut("{id}")]
        [ProducesResponseType(StatusCodes.Status204NoContent)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        public async Task<IActionResult> UpdateHospital(int id, [FromBody] Hospital hospital)
        {
            if (id != hospital.Id)
                return BadRequest("ID mismatch");

            var existingHospital = await _hospitalService.GetHospitalByIdAsync(id);
            if (existingHospital == null)
                return NotFound();

            existingHospital.NomHospital = hospital.NomHospital ?? existingHospital.NomHospital;
            existingHospital.Ville = hospital.Ville ?? existingHospital.Ville;
            existingHospital.Departement = hospital.Departement ?? existingHospital.Departement;
            existingHospital.IdentiteHopital = hospital.IdentiteHopital ?? existingHospital.IdentiteHopital;
            existingHospital.ReanimationMedical = hospital.ReanimationMedical ?? existingHospital.ReanimationMedical;
            existingHospital.ReanimationChirurgical = hospital.ReanimationChirurgical ?? existingHospital.ReanimationChirurgical;
            existingHospital.Activite = hospital.Activite ?? existingHospital.Activite;

            await _hospitalService.UpdateHospitalAsync(existingHospital);
            return Ok(existingHospital);
        }

        /// <summary>
        /// Deletes a specific hospital
        /// </summary>
        /// <param name="id">Hospital ID</param>
        /// <response code="204">If the hospital was deleted</response>
        /// <response code="404">If the hospital is not found</response>
        [HttpDelete("{id}")]
        [ProducesResponseType(StatusCodes.Status204NoContent)]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        public async Task<IActionResult> DeleteHospital(int id)
        {
            var existingHospital = await _hospitalService.GetHospitalByIdAsync(id);
            if (existingHospital == null)
                return NotFound();

            var success = await _hospitalService.DeleteHospitalAsync(id);
            if (!success)
                return StatusCode(StatusCodes.Status500InternalServerError, "Error deleting hospital.");
            return NoContent();
        }
    }
}
