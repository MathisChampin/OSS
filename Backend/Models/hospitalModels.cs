using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq.Expressions;

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
        public ICollection<PMedical> PMedicals {get; set; } = new List<PMedical>();
        public ICollection<PNoMedical> PNoMedicals {get; set; } = new List<PNoMedical>();
        public ICollection<Material> Materials {get; set; } = new List<Material>();
    }
}
