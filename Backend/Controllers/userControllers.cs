using Microsoft.AspNetCore.Mvc;
using Models;
using Services;
using System.Security.Claims;
using Microsoft.IdentityModel.Tokens;
using System.Text;
using System.IdentityModel.Tokens.Jwt;
using BCrypt.Net;

namespace Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class UserController : ControllerBase
    {
        private readonly IUserService _userService;

        public UserController(IUserService userService)
        {
            _userService = userService;
        }

        /// <summary>
        /// Gets all users
        /// </summary>
        /// <returns>A list of users</returns>
        /// <response code="200">Returns the list of users</response>
        [HttpGet]
        [ProducesResponseType(StatusCodes.Status200OK)]
        public async Task<IActionResult> GetUsers()
        {
            var users = await _userService.GetAllUsersAsync();
            if (users.Count == 0)
                return Ok(new { });
            return Ok(users);
        }


        /// <summary>
        /// Get a specific user by ID
        /// </summary>
        /// <param name="id">User ID</param>
        /// <returns>The requested user</returns>
        /// <response code="200">Returns the user</response>
        /// <response code="404">If the user is not found</response>
        [HttpGet("{id}")]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        public async Task<IActionResult> GetUser(int id)
        {
            var user = await _userService.GetUserByIdAsync(id);
            if (user == null)
                return NotFound();
            return Ok(user);
        }

        /// <summary>
        /// Creates a new user
        /// </summary>
        /// <param name="user">User data</param>
        /// <returns>The created user</returns>
        /// <response code="201">Returns the created user</response>
        /// <response code="404">If the hospital is not found</response>
        /// <response code="409">If the user already exists in the hospital</response>
        [HttpPost]
        [ProducesResponseType(StatusCodes.Status201Created)]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        [ProducesResponseType(StatusCodes.Status409Conflict)]
        public async Task<IActionResult> PostUser([FromBody] User user)
        {
            try {
                user.Password = BCrypt.Net.BCrypt.HashPassword(user.Password);
                var createdUser = await _userService.CreateUserAsync(user);
                return CreatedAtAction(nameof(GetUser), new { id = createdUser.Id }, createdUser);
            } catch (KeyNotFoundException ex) {
                return NotFound(ex.Message);
            } catch (InvalidOperationException ex) {
                return Conflict(ex.Message);
            }
        }

        /// <summary>
        /// Login users
        /// </summary>
        /// <returns>A token </returns>
        /// <response code="200">Returns the token</response>
        [HttpPost("login")]
        [ProducesResponseType(StatusCodes.Status204NoContent)]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        public async Task<IActionResult> Login([FromBody] LoginRequest request)
        {
            if (request.Email == null || request.Password == null)
                 throw new ArgumentException("Email or password is null");
            var user = await _userService.AuthenticateAsync(request.Email, request.Password);
            if (user == null)
                return Unauthorized("Invalid email or password.");

            var token = GenerateJwtToken(user);
            return Ok(new { Token = token });
        }

        /// <summary>
        /// Updates an existing user
        /// </summary>
        /// <param name="id">User ID</param>
        /// <param name="user">Updated user data</param>
        /// <response code="204">If the update is successful</response>
        /// <response code="400">If the ID in the URL does not match the user ID</response>
        /// <response code="404">If the user is not found</response>
        [HttpPut("{id}")]
        [ProducesResponseType(StatusCodes.Status204NoContent)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        public async Task<IActionResult> PutUser(int id, User user)
        {
            if (id != user.Id)
                return BadRequest("ID mismatch");

            var existingUser = await _userService.GetUserByIdAsync(id);
            if (existingUser == null)
                return NotFound();

            existingUser.NomHopital = user.NomHopital ?? existingUser.NomHopital;
            existingUser.Prenom = user.Prenom ?? existingUser.Prenom;
            existingUser.Nom = user.Nom ?? existingUser.Nom;
            existingUser.Email = user.Email ?? existingUser.Email;
            existingUser.Password = user.Password ?? existingUser.Password;

            await _userService.UpdateUserAsync(existingUser);
            return Ok(existingUser);
        }

        /// <summary>
        /// Deletes a specific user by ID
        /// </summary>
        /// <param name="id">User ID</param>
        /// <response code="204">If the user is successfully deleted</response>
        /// <response code="404">If the user is not found</response>
        [HttpDelete("{id}")]
        [ProducesResponseType(StatusCodes.Status204NoContent)]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        public async Task<IActionResult> DeleteUser(int id)
        {
            var existingUser = await _userService.GetUserByIdAsync(id);
            if (existingUser == null)
                return NotFound();

            var success = await _userService.DeleteUserAsync(id);
            if (!success)
                return StatusCode(StatusCodes.Status500InternalServerError, "Error deleting Patient.");
            return NoContent();
        }


        private string GenerateJwtToken(User user)
        {
            if (user.Email == null)
                throw new ArgumentException("Email or password is null");
    
            var claims = new[]
            {
                new Claim(JwtRegisteredClaimNames.Sub, user.Email),
                new Claim(JwtRegisteredClaimNames.Jti, Guid.NewGuid().ToString())
            };

            var jwtSecretKey = Environment.GetEnvironmentVariable("JWT_SECRET_KEY");
            if (jwtSecretKey == null)
                throw new InvalidOperationException("JWT secret key not found in .env file");

            var key = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(jwtSecretKey));
            var creds = new SigningCredentials(key, SecurityAlgorithms.HmacSha256);

            var token = new JwtSecurityToken(
                issuer: null,
                audience: null,
                claims: claims,
                expires: DateTime.Now.AddMinutes(30),
                signingCredentials: creds);

            return new JwtSecurityTokenHandler().WriteToken(token);
        }
    }
}
