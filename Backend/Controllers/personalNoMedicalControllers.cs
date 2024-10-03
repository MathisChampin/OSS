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
    }
}
