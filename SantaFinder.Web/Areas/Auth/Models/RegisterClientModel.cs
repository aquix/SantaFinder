using SantaFinder.Entities;

namespace SantaFinder.Web.Areas.Auth.Models
{
    public class RegisterClientModel : RegisterModelBase
    {
        public string Name { get; set; }
        public Address Address { get; set; }
        public Location Location { get; set; }
    }
}