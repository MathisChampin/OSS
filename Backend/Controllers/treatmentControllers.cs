using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Authorization;
using Models;
using Services;

namespace Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class TreatmentController : ControllerBase
    {
        private readonly ITreatmentService _treatmentService;

        public TreatmentController(ITreatmentService treatmentService)
        {
            _treatmentService = treatmentService;
        }

        // <summary>
        // Gets all treatment
        // </summary>
        // <returns>A list of treatment</returns>
        // <response code="200">Returns the list of treatments</response>
        [HttpGet]
        [Authorize]
        [ProducesResponseType(StatusCodes.Status200OK)]
        public async Task<IActionResult> GetTreatments()
        {
            var treatment = await _treatmentService.GetAllTreatmentsAsync();
            if (treatment.Count == 0)
                return Ok(new { });
            return Ok(treatment);
        }

        // <summary>
        // Gets a specific Treatment by Name
        // </summary>
        /// <param name="NameTreatment">Treatment Name</param>
        // <returns>The requested Treatment</returns>
        // <response code="200">Returns the treatmen</response>
        // <response code="404">If the patient is not found</response>
        [HttpGet("{name}")]
        [Authorize]
        [ProducesResponseType(StatusCodes.Status200OK)]
        public async Task<IActionResult> GetTreatmentByName(string name)
        {
            var treatment = await _treatmentService.GetTreatmentByNameAsync(name);
            if (treatment == null)
            {
                return NotFound($"Treatment with name '{name}' not found.");
            }
            return Ok(treatment);
        }

        // <summary>
        // Creates a new treatment treatment
        // </summary>
        /// <param name="model">Treatment</param>
        // <returns>The created treatment</returns>
        // <response code="201">Returns the created treatment</response>
        // <response code="404">If the hospital is not found</response>
        [HttpPost]
        [Authorize]
        [ProducesResponseType(StatusCodes.Status201Created)]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        public async Task<IActionResult> PostTreatment([FromBody] Treatment model)
        {
            if (!ModelState.IsValid)
                return BadRequest(ModelState);
            try {
                var createdTreatment = await _treatmentService.CreateTreatmentAsync(model);
                return CreatedAtAction(nameof(GetTreatments), new { id = createdTreatment.Id }, createdTreatment);
            } catch (KeyNotFoundException ex) {
                return NotFound(ex.Message);
            } catch (Exception ex) {
                return StatusCode(500, "Erreur interne du serveur : " + ex.Message);
            }
        }

        // <summary>
        // Update a existing treatment
        // </summary>
        /// <param name="id, model">Treatment</param>
        // <returns>The updated treatment</returns>
        // <response code="201">Returns the updated treatment</response>
        // <response code="404">If the treatment is not found</response>
        [HttpPut("{id}")]
        [Authorize]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        public async Task<IActionResult> UpdateTreatment(int id, [FromBody] Treatment model)
        {
            if (!ModelState.IsValid)
                return BadRequest(ModelState);

            try
            {
                var updatedTreatment = await _treatmentService.UpdateTreatmentAsync(id, model);
                if (updatedTreatment == null)
                    return NotFound($"Treatment with id '{id}' not found.");

                return Ok(updatedTreatment);
            }
            catch (Exception ex)
            {
                return StatusCode(500, "Erreur interne du serveur : " + ex.Message);
            }
        }

        // <summary>
        // Delete a existing treatment
        // </summary>
        /// <param name="id">Treatment</param>
        // <returns>The deleted treatment</returns>
        // <response code="201">Returns the deleted treatment</response>
        // <response code="404">If the treatment is not found</response>
        [HttpDelete("{id}")]
        [Authorize]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        public async Task<IActionResult> DeleteTreatment(int id)
        {
            try
            {
                var deleted = await _treatmentService.DeleteTreatmentAsync(id);
                if (!deleted)
                    return NotFound($"Treatment with id '{id}' not found.");

                return Ok($"Treatment with id '{id}' deleted successfully.");
            }
            catch (Exception ex)
            {
                return StatusCode(500, "Erreur interne du serveur : " + ex.Message);
            }
        }
    }
}
