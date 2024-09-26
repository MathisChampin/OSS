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
        public int Taille { get; set; }
        [Required]
        public int Poids { get; set; }
        [Required]
        public string? NomHopital { get; set; }
        public int HospitalId { get; set; }
        public double IMC { get; set; }
        public double SetImc(int? taille, int? poids)
        {
            double imc = 0.0;
        
            if (taille.HasValue && poids.HasValue && taille > 0) {
                imc = (double)poids / ((double)taille * (double)taille);
                return imc;
            }
            return 0;
        }
    }
}
