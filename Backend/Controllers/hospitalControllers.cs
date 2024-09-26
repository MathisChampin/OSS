using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Models;
using Backend;

namespace Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class HospitalController : ControllerBase
    {
        private readonly DataContext _context;

        public HospitalController(DataContext context)
        {
            _context = context;
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
            var hospitals = await _context.Hospitals
                .Include(h => h.Users)
                .Include(h => h.Patients)
                .ToListAsync();
            if (hospitals.Count == 0)
            {
                return Ok(new { });
            }
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
            var hospital = await _context.Hospitals
                .Include(h => h.Users)
                .Include(h => h.Patients)
                .FirstOrDefaultAsync(h => h.Id == id);

            if (hospital == null)
            {
                return NotFound();
            }

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
        public async Task<IActionResult> CreateHospital(Hospital hospital)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var existingHospital = await _context.Hospitals
                .FirstOrDefaultAsync(h => h.NomHopital == hospital.NomHopital);

            if (existingHospital != null)
                return Conflict("L'hôpital existe déjà.");

            _context.Hospitals.Add(hospital);
            await _context.SaveChangesAsync();

            return CreatedAtAction(nameof(GetHospital), new { id = hospital.Id }, hospital);
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
        public async Task<IActionResult> UpdateHospital(int id, Hospital hospital)
        {
            if (id != hospital.Id)
            {
                return BadRequest();
            }

            _context.Entry(hospital).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!HospitalExists(id))
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
            var hospital = await _context.Hospitals.FindAsync(id);

            if (hospital == null)
            {
                return NotFound();
            }

            _context.Hospitals.Remove(hospital);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        private bool HospitalExists(int id)
        {
            return _context.Hospitals.Any(e => e.Id == id);
        }
    }
}
