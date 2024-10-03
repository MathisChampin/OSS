using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace Models
{
    public class PMedical
    {
        public int Id { get; set; }
        public int? NbDoctorUniv {get; set; }
        public int? NbDoctorHosp {get; set; }
        public int? NbInternal {get; set; }
        public int? NbDoctor {get; set; }
        public int? NbPersonalAbs {get; set; }
        public int? HospitalId {get; set; }
    }
}
