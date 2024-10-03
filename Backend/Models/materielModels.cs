using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace Models
{
    public class Device
    {
        public int Id {get; set; }
        public int? Quantity { get; set; }
        public string? Name { get; set; }
        public int? MaterialId {get; set; }
    }

    public class Material
    {
        public int Id { get; set; }
        public int? NbBedRea {get; set; }
        public int? NbBedInRoom {get; set; }
        public int? NbBedMntr {get; set; }
        public int? NbAdmis {get; set; }
        public int? NbPersonalAbs {get; set; }
        public List<Device>? Device { get; set; }
        public string? Ecmo {get; set;}
        public int? HospitalId {get; set; }
    }

    public class MaterialWithDevice
    {
    public Material Material { get; set; } = new Material();
    public Device Device { get; set; } = new Device();
    }
}
