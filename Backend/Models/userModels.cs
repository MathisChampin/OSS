using System.ComponentModel.DataAnnotations;

namespace Models
{
    public class User
    {
        public int Id { get; set; }
        [Required]
        public string? Nom { get; set; }
        [Required]
        public string? Prenom { get; set; }
        [Required]
        public string? Role { get; set; }
        [Required]
        [EmailAddress]
        public string? Email { get; set; }
        [Required]
        public string? Password { get; set; }
        [Required]
        public string? NomHopital { get; set; }
        public int HospitalId { get; set; }
    }
    public class LoginRequest
    {
        public string? Email { get; set; }
        public string? Password { get; set; }
    }

    public class RefreshToken
    {
        public int Id {get; set; }
        public int? UserId {get; set; }
        public int? HospitalId {get; set; }
        public string? Token {get; set; }
        public DateTime Expiration { get; set; }
    }
}
