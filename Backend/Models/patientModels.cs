using System.ComponentModel.DataAnnotations;

namespace Models
{
    public class Patient
    {
        public int Id { get; set; }

        [Required]
        public string? Genre { get; set; }

        [Required]
        public string? DateDeNaissance { get; set; }

        [Required]
        public int? Taille { get; set; }

        [Required]
        public int? Poids { get; set; }

        [Required]
        public string? NomHopital {get; set; }
        public int? IMC {get; set; }
    
        public int? VT {get; set; }
    }
}
