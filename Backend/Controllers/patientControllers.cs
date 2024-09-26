using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Models;
using Backend;

namespace Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class PatientController : ControllerBase
    {
        private readonly DataContext _context;

        public PatientController(DataContext context)
        {
            _context = context;
        }

        // GET: api/patient
        [HttpGet]
        public async Task<IActionResult> GetPatients()
        {
            var patients = await _context.Patients.ToListAsync();

            if (patients.Count == 0)
            {
                return Ok(new { });
            }

            return Ok(patients);
        }


        // GET: api/patient/5
        [HttpGet("{id}")]
        public async Task<IActionResult> GetPatient(int id)
        {
            var patient = await _context.Patients.FirstOrDefaultAsync(u => u.Id == id);
            if (patient == null)
            {
                return NotFound();
            }
            return Ok(patient);
        }

        // POST: api/patient
        [HttpPost]
        public async Task<IActionResult> PostPatient([FromBody] Patient patient)
        {
            var hospital = await _context.Hospitals
                .FirstOrDefaultAsync(h => h.NomHopital == patient.NomHopital);

            if (hospital == null)
                return NotFound("L'hôpital n'existe pas dans la base de données.");

            patient.HospitalId = hospital.Id;
            patient.DateDeNaissance = DateTime.SpecifyKind(patient.DateDeNaissance, DateTimeKind.Utc);
            patient.IMC = patient.SetImc(patient.Taille, patient.Poids);
            _context.Patients.Add(patient);
            await _context.SaveChangesAsync();

            hospital.Patients.Add(patient);
            await _context.SaveChangesAsync();
            return CreatedAtAction(nameof(GetPatient), new { id = patient.Id }, patient);
        }

        // PUT: api/patient/5
        [HttpPut("{id}")]
        public async Task<IActionResult> PutPatient(int id, Patient patient)
        {
            if (id != patient.Id)
            {
                return BadRequest();
            }

            _context.Entry(patient).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!PatientExists(id))
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

        // DELETE: api/patient/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeletePatient(int id)
        {
            var patient = await _context.Patients.FindAsync(id);
            if (patient == null)
            {
                return NotFound();
            }

            _context.Patients.Remove(patient);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        private bool PatientExists(int id)
        {
            return _context.Patients.Any(e => e.Id == id);
        }
    }
}
