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
    }
}
