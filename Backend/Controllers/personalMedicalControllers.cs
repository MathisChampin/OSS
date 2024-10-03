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
        /// Gets all patients
        /// </summary>
        /// <returns>A list of patients</returns>
        /// <response code="200">Returns the list of patients</response>
        [HttpGet]
        [ProducesResponseType(StatusCodes.Status200OK)]
        public async Task<IActionResult> GetPMedical()
        {
            var hopitalId = User.FindFirst("HopitalId")?.Value;
            if (string.IsNullOrEmpty(hopitalId))
                return Unauthorized("L'utilisateur n'est pas lié à un hôpital.");

            var pmedical = await _pmedicalService.GetAllPMedicalsAsync();
            if (pmedical.Count == 0)
                return Ok(new { });
            return Ok(pmedical);
        }
    }
}
