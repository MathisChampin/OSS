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
            var patients = await _context.Patients
                .Include(p => p.Hospitalisation)
                .ToListAsync();

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
            var patient = await _context.Patients
                .Include(p => p.Hospitalisation)
                .FirstOrDefaultAsync(u => u.Id == id);

            if (patient == null)
            {
                return NotFound();
            }
            return Ok(patient);
        }

        // POST: api/patient
        [HttpPost]
        public async Task<IActionResult> PostPatient([FromBody] PatientWithHospitalisation model)
        {
            var hospital = await _context.Hospitals
                .FirstOrDefaultAsync(h => h.NomHopital == model.Patient.NomHopital);

            if (hospital == null)
                return NotFound("L'hôpital n'existe pas dans la base de données.");

            model.Patient.HospitalId = hospital.Id;
            model.Patient.DateDeNaissance = DateTime.SpecifyKind(model.Patient.DateDeNaissance, DateTimeKind.Utc);
            model.Patient.IMC = model.Patient.SetImc(model.Patient.Taille, model.Patient.Poids);
            _context.Patients.Add(model.Patient);
            await _context.SaveChangesAsync();

            model.Hospitalisation.PatientId = model.Patient.Id;
            model.Hospitalisation.DateHospitalisation = DateTime.SpecifyKind(model.Hospitalisation.DateHospitalisation, DateTimeKind.Utc);
            model.Hospitalisation.DateHospitalisationRéa = DateTime.SpecifyKind(model.Hospitalisation.DateHospitalisationRéa, DateTimeKind.Utc);
            _context.Hospitalisations.Add(model.Hospitalisation);
            await _context.SaveChangesAsync();

            hospital.Patients.Add(model.Patient);
            await _context.SaveChangesAsync();

            return CreatedAtAction(nameof(GetPatient), new { id = model.Patient.Id }, model.Patient);
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
