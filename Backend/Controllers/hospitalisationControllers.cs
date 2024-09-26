using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Models; // Assurez-vous d'importer le bon espace de noms pour vos modèles
using Backend; // Assurez-vous d'importer le bon espace de noms pour votre contexte de base de données

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

        // GET: api/hospitalisation
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Hospitalisation>>> GetHospitalisations()
        {
            return await _context.Hospitalisations.ToListAsync();
        }

        // GET: api/hospitalisation/{id}
        [HttpGet("{id}")]
        public async Task<ActionResult<Hospitalisation>> GetHospitalisation(int id)
        {
            var hospitalisation = await _context.Hospitalisations.FindAsync(id);

            if (hospitalisation == null)
            {
                return NotFound();
            }

            return hospitalisation;
        }

        // PUT: api/hospitalisation/{id}
        [HttpPut("{id}")]
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

        // DELETE: api/hospitalisation/{id}
        [HttpDelete("{id}")]
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
