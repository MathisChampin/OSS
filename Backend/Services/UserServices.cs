using System.Collections.Generic;
using System.Threading.Tasks;
using Repositories;
using Models;
using System.Security.Cryptography;

namespace Services
{
    public class UserService : IUserService
    {
        private readonly IUserRepository _userRepository;
        private readonly IHospitalRepository _hospitalRepository;

        public UserService(IUserRepository userRepository, IHospitalRepository hospitalRepository)
        {
            _userRepository = userRepository;
            _hospitalRepository = hospitalRepository;
        }

        public async Task<List<User>> GetAllUsersAsync()
        {
            return await _userRepository.GetAllAsync();
        }

        public async Task<User?> GetUserByIdAsync(int id)
        {
            return await _userRepository.GetByIdAsync(id);
        }
        public async Task<User> CreateUserAsync(User user)
        {
            if (string.IsNullOrWhiteSpace(user.NomHospital))
                throw new ArgumentException("Le nom de l'hôpital ne peut pas être nul ou vide.");
            var hospital = await _hospitalRepository.GetByNameAsync(user.NomHospital);
            if (hospital == null)
                throw new KeyNotFoundException("L'hôpital n'existe pas dans la base de données.");

            if (string.IsNullOrWhiteSpace(user.Email))
                throw new ArgumentNullException(nameof(user.Email), "L'email ne peut pas être vide.");
            var existingUser = await _userRepository.GetUserByEmailAndHospitalIdAsync(user.Email, hospital.Id);
            if (existingUser != null)
                throw new InvalidOperationException("L'utilisateur existe déjà dans cet hôpital.");

            user.HospitalId = hospital.Id;

            var createdUser = await _userRepository.CreateAsync(user);

            hospital.Users.Add(user);
            await _hospitalRepository.UpdateAsync(hospital);

            return createdUser;
        }
        public async Task UpdateUserAsync(User user)
        {
            await _userRepository.UpdateAsync(user);
        }

        public async Task<bool> DeleteUserAsync(int id)
        {
            return await _userRepository.DeleteAsync(id);
        }
        public async Task<User?> AuthenticateAsync(string email, string password)
        {
            var user = await _userRepository.GetByEmailAsync(email);
            if (user == null)
                throw new InvalidOperationException("L'utilisateur n`existe pas.");
            if (string.IsNullOrWhiteSpace(user.Password))
                throw new ArgumentException("Le Paswword ne peut pas être nul ou vide.");
            if (!VerifyPassword(password, user.Password))
                return null;
            return user;
        }

        private bool VerifyPassword(string password, string passwordHash)
        {
            return BCrypt.Net.BCrypt.Verify(password, passwordHash);
        }

        public async Task<string> GenerateRefreshTokenAsync(int userId)
        {
            return await _userRepository.GenerateRefreshTokenAsync(userId);
        }

        public async Task<(int? userId, int? hospitalId)> ValidateRefreshTokenAsync(string refreshToken)
        {
            return await _userRepository.ValidateRefreshTokenAsync(refreshToken);
        }
    }
}
