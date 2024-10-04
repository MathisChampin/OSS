using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace Models
{
    public class PNoMedical
    {
        public int Id { get; set; }
        public int? NbIdeDay {get; set; }
        public int? NbIdeNight {get; set; }
        public int? NbIdeDayUsc {get; set; }
        public int? NbIdeNightUsc {get; set; }
        public int? NbAsDay {get; set; }
        public int? NbAsNight {get; set; }
        public int? NbAsDayUsc {get; set; }
        public int? NbAsNightUsc {get; set; }
        public int? NbExecDay {get; set; }
        public int? NbIdeSick {get; set; }
        public int? NbAsSick {get; set; }
        public int? NbAppIde {get; set; }
        public int? NbAppAs {get; set; }
        public int? HospitalId {get; set; }
    }
}
