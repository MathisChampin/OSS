using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Models;
using Backend;

namespace Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class HospitalisationController : ControllerBase
    {
        private readonly DataContext _context;

        public HospitalisationController(DataContext context)
        {
            _context = context;
        }


        /// <summary>
        /// Gets all hospitalisations
        /// </summary>
        /// <returns>A list of hospitalisations</returns>
        /// <response code="200">Returns the list of hospitalisations</response>
        [HttpGet]
        [ProducesResponseType(StatusCodes.Status200OK)]
        public async Task<ActionResult<IEnumerable<Hospitalisation>>> GetHospitalisations()
        {
            return await _context.Hospitalisations.ToListAsync();
        }

        /// <summary>
        /// Get a specific hospitalisation by ID
        /// </summary>
        /// <param name="id">Hospitalisation ID</param>
        /// <returns>The requested hospitalisation</returns>
        /// <response code="200">Returns the hospitalisation</response>
        /// <response code="404">If the hospitalisation is not found</response>
        [HttpGet("{id}")]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        public async Task<ActionResult<Hospitalisation>> GetHospitalisation(int id)
        {
            var hospitalisation = await _context.Hospitalisations.FindAsync(id);

            if (hospitalisation == null)
            {
                return NotFound();
            }

            return hospitalisation;
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
        [ProducesResponseType(StatusCodes.Status204NoContent)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        public async Task<IActionResult> PutHospitalisation(int id, [FromBody] Hospitalisation hospitalisation)
        {
            if (id != hospitalisation.Id)
            {
                return BadRequest();
            }

            _context.Entry(hospitalisation).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!HospitalisationExists(id))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            return NoContent();
        }

        /// <summary>
        /// Deletes a specific hospitalisation
        /// </summary>
        /// <param name="id">Hospitalisation ID</param>
        /// <response code="204">If the hospitalisation was successfully deleted</response>
        /// <response code="404">If the hospitalisation is not found</response>
        [HttpDelete("{id}")]
        [ProducesResponseType(StatusCodes.Status204NoContent)]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        public async Task<IActionResult> DeleteHospitalisation(int id)
        {
            var hospitalisation = await _context.Hospitalisations.FindAsync(id);
            if (hospitalisation == null)
            {
                return NotFound();
            }

            _context.Hospitalisations.Remove(hospitalisation);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        private bool HospitalisationExists(int id)
        {
            return _context.Hospitalisations.Any(e => e.Id == id);
        }
    }
}
