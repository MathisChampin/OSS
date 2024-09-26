using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace Models
{
    public class Hospital
    {
        public int Id { get; set; }
        [Required]
        public string? NomHopital { get; set; }
        public string? Ville { get; set; }
        public string? Departement { get; set; }
        public string? IdentiteHopital { get; set; }
        public string? ReanimationMedical { get; set; }
        public string? ReanimationChirurgical { get; set; }
        public string? Activite { get; set; }
        public ICollection<User> Users { get; set; } = new List<User>();
        public ICollection<Patient> Patients { get; set; } = new List<Patient>();
    }
}
