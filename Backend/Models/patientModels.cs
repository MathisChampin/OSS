using System.ComponentModel.DataAnnotations;
using System.Collections.Generic;

namespace Models
{
        public class Hospitalisation
    {
        public int Id { get; set; }
        [Required]
        public DateTime? DateHospitalisation { get; set; }
        [Required]
        public string? HospitalisationRéa {get; set; }
        [Required]
        public DateTime? DateHospitalisationRéa { get; set; }
        [Required]
        public string? TypeDeService { get; set; }
        [Required]
        public string? ModalitéEntrée { get; set; }
        public int PatientId { get; set; }
    }

    public class Patient
    {
        public int Id { get; set; }
        [Required]
        public string? Genre { get; set; }
        [Required]
        public DateTime DateDeNaissance { get; set; }
        [Required]
        public int Taille { get; set; }
        [Required]
        public int Poids { get; set; }
        [Required]
        public string? NomHopital { get; set; }
        public int HospitalId { get; set; }
        public double IMC { get; set; }
        public Hospitalisation? Hospitalisation { get; set; }
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

    public class PatientWithHospitalisation
    {
    public Patient Patient { get; set; } = new Patient();
    public Hospitalisation Hospitalisation { get; set; } = new Hospitalisation();
    }
}
