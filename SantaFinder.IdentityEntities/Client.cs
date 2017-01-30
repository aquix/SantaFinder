using System.ComponentModel.DataAnnotations.Schema;
using SantaFinder.Entities;

namespace SantaFinder.IdentityEntities
{
    [Table("Clients")]
    public class Client : User
    {
        public string Name { get; set; }
        public Address Address { get; set; }
        public Location Location { get; set; }
    }
}
