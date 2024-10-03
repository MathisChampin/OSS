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
            var hospitalId = User.FindFirst("HospitalId")?.Value;
            if (string.IsNullOrEmpty(hospitalId))
                return Unauthorized("L'utilisateur n'est pas lié à un hôpital.");

            var noMedical = await _noMedicalService.GetAllPNoMedicalsAsync();
            if (noMedical.Count == 0)
                return Ok(new { });
            return Ok(noMedical);
        }
    }
}
