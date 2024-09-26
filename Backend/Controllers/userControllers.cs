using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Models;
using Backend;

namespace Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class UserController : ControllerBase
    {
        private readonly DataContext _context;

        public UserController(DataContext context)
        {
            _context = context;
        }

        // GET: api/user
        [HttpGet]
        public async Task<IActionResult> GetUsers()
        {
            var users = await _context.Users.ToListAsync();

            if (users.Count == 0)
            {
                return Ok(new { });
            }

            return Ok(users);
        }


        // GET: api/User/5
        [HttpGet("{id}")]
        public async Task<IActionResult> GetUser(int id)
        {
            var user = await _context.Users.FirstOrDefaultAsync(u => u.Id == id);
            if (user == null)
            {
                return NotFound();
            }
            return Ok(user);
        }

        // POST: api/user
        [HttpPost]
        public async Task<IActionResult> PostUser([FromBody] User user)
        {
            var hospital = await _context.Hospitals
                .FirstOrDefaultAsync(h => h.NomHopital == user.NomHopital);

            if (hospital == null)
                return NotFound("L'hôpital n'existe pas dans la base de données.");

            var existingUser = await _context.Users
                    .FirstOrDefaultAsync(u => u.Email == user.Email && u.HospitalId == hospital.Id);

                if (existingUser != null)
                    return Conflict("L'utilisateur existe déjà dans cet hôpital.");

            user.HospitalId = hospital.Id;
            _context.Users.Add(user);
            await _context.SaveChangesAsync();

            hospital.Users.Add(user);
            await _context.SaveChangesAsync();
            return CreatedAtAction(nameof(GetUser), new { id = user.Id }, user);
        }

        // PUT: api/user/5
        [HttpPut("{id}")]
        public async Task<IActionResult> PutUser(int id, User user)
        {
            if (id != user.Id)
            {
                return BadRequest();
            }

            _context.Entry(user).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!UserExists(id))
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

        // DELETE: api/user/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteUser(int id)
        {
            var user = await _context.Users.FindAsync(id);
            if (user == null)
            {
                return NotFound();
            }

            _context.Users.Remove(user);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        private bool UserExists(int id)
        {
            return _context.Users.Any(e => e.Id == id);
        }
    }
}
