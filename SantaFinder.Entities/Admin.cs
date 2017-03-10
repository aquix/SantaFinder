using System.ComponentModel.DataAnnotations.Schema;

namespace SantaFinder.Entities
{
    [Table("Admins")]
    public class Admin : User
    {
        public string Name { get; set; }
    }
}
