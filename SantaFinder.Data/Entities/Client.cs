using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace SantaFinder.Data.Entities
{
    [Table("Clients")]
    public class Client : User
    {
        public string Name { get; set; }
        public Address Address { get; set; }
        public Location Location { get; set; }
    }
}
