using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace Models
{
    public class Treatment
    {
        public int Id { get; set; }
        public string? NameTreatment {get; set; }
        public DateTime? DateStartTreatment {get; set; }
        public DateTime? DateEndTreatment {get; set; }
        public int? Status {get; set; }
    }
}
