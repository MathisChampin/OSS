using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace Models
{
    public class DeviceInfo
    {
        public int? Quantity { get; set; }
        public string? Name { get; set; }
    }

    public class Material
    {
        public int Id { get; set; }
        public int? NbBedRea {get; set; }
        public int? NbBedInRoom {get; set; }
        public int? NbBedMntr {get; set; }
        public int? NbAdmis {get; set; }
        public int? NbPersonalAbs {get; set; }
        public List<DeviceInfo> Devices { get; set; } = new List<DeviceInfo>();
        public string? Ecmo {get; set;}
        public int? HospitalId {get; set; }
    }
}
