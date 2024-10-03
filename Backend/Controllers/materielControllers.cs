using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.AspNetCore.Authorization;
using Models;
using Services;

namespace Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class MaterialController : ControllerBase
    {
        private readonly IMaterialService _materialService;

        public MaterialController(IMaterialService materialService)
        {
            _materialService = materialService;
        }

        /// <summary>
        /// Gets all material
        /// </summary>
        /// <returns>A list of material</returns>
        /// <response code="200">Returns the list of material</response>
        [HttpGet]
        [Authorize]
        [ProducesResponseType(StatusCodes.Status200OK)]
        public async Task<IActionResult> GetMaterials()
        {
            var material = await _materialService.GetAllMaterialsAsync();
            if (material.Count == 0)
                return Ok(new { });
            return Ok(material);
        }

        /// <summary>
        /// Gets a specific material by ID
        /// </summary>
        /// <param name="id">material ID</param>
        /// <returns>The requested material</returns>
        /// <response code="200">Returns the material</response>
        /// <response code="404">If the material is not found</response>
        [HttpGet("{id}")]
        [Authorize]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        public async Task<IActionResult> GetMaterial(int id)
        {
            var material = await _materialService.GetMaterialByIdAsync(id);
            if (material == null)
                return NotFound();
            return Ok(material);
        }

        /// <summary>
        /// Creates a new material along with their hospitalisation
        /// </summary>
        /// <param name="model">material data</param>
        /// <returns>The created material</returns>
        /// <response code="201">Returns the created material</response>
        /// <response code="404">If the hospital is not found</response>
        [HttpPost]
        [Authorize]
        [ProducesResponseType(StatusCodes.Status201Created)]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        public async Task<IActionResult> PostPMaterial([FromBody] MaterialWithDevice model)
        {
            if (!ModelState.IsValid)
                return BadRequest(ModelState);
            try {
                var hospitalIdClaim = User.FindFirst("HospitalId")?.Value;
                if (string.IsNullOrEmpty(hospitalIdClaim))
                    return Unauthorized("L'utilisateur n'est pas lié à un hôpital.");
                if (!int.TryParse(hospitalIdClaim, out int hospitalId))
                    return BadRequest("L'ID de l'hôpital est invalide.");
                var createdMaterial = await _materialService.CreateMaterialAsync(model, hospitalId);
                return CreatedAtAction(nameof(GetMaterials), new { id = createdMaterial.Id }, createdMaterial);
            } catch (KeyNotFoundException ex) {
                return NotFound(ex.Message);
            } catch (Exception ex) {
                return StatusCode(500, "Erreur interne du serveur : " + ex.Message);
            }
        }

        /// <summary>
        /// Updates an existing material
        /// </summary>
        /// <param name="id">material ID</param>
        /// <param name="material">Updated material data</param>
        /// <response code="204">If the update is successful</response>
        /// <response code="400">If the ID in the URL does not match the material ID</response>
        /// <response code="404">If the material is not found</response>
        [HttpPut("{id}")]
        [Authorize]
        [ProducesResponseType(StatusCodes.Status204NoContent)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        public async Task<IActionResult> PutMaterial(int id, [FromBody] Material material)
        {
            if (id != material.Id)
                return BadRequest("ID mismatch");

            var existingMaterial = await _materialService.GetMaterialByIdAsync(id);
            if (existingMaterial == null)
                return NotFound();

            existingMaterial.NbBedRea = material.NbBedRea ?? existingMaterial.NbBedRea;
            existingMaterial.NbBedInRoom = material.NbBedInRoom ?? existingMaterial.NbBedInRoom;
            existingMaterial.NbBedMntr = material.NbBedMntr ?? existingMaterial.NbBedMntr;
            existingMaterial.NbAdmis = material.NbAdmis ?? existingMaterial.NbAdmis;
            existingMaterial.NbPersonalAbs = material.NbPersonalAbs ?? existingMaterial.NbPersonalAbs;
            existingMaterial.Device = material.Device ?? existingMaterial.Device;
            existingMaterial.Ecmo = material.Ecmo ?? existingMaterial.Ecmo;

            await _materialService.UpdateMaterialAsync(existingMaterial);
            return Ok(existingMaterial);
        }

        /// <summary>
        /// Deletes a specific material
        /// </summary>
        /// <param name="id">material ID</param>
        /// <response code="204">If the material is successfully deleted</response>
        /// <response code="404">If the material is not found</response>
        [HttpDelete("{id}")]
        [Authorize]
        [ProducesResponseType(StatusCodes.Status204NoContent)]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        public async Task<IActionResult> DeleteMaterial(int id)
        {
            var existingMaterial = await _materialService.GetMaterialByIdAsync(id);
            if (existingMaterial == null)
                return NotFound();

            var success = await _materialService.DeleteMaterialAsync(id);
            if (!success)
                return StatusCode(StatusCodes.Status500InternalServerError, "Error deleting Personal medical.");
            return NoContent();
        }
    }
}
