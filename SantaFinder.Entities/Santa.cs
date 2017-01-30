using System.ComponentModel.DataAnnotations.Schema;

namespace SantaFinder.Entities
{
    [Table("Santas")]
    public class Santa : User
    {
        public string Name { get; set; }
        public string PhotoPath { get; set; }
        public int NumberOfOrders { get; set; }
        public float? Rating { get; set; }
    }
}
