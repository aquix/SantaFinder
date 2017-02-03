using System.ComponentModel.DataAnnotations.Schema;

namespace SantaFinder.Entities
{
    [Table("Clients")]
    public class Client : User
    {
        public string Name { get; set; }
        public Address Address { get; set; }
        public Location Location { get; set; }
    }
}
