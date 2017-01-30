using SantaFinder.Entities;

namespace SantaFinder.Web.Models.Shared
{
    public class AddressWithLocation
    {
        public Address Line { get; set; }
        public Location Location { get; set; }
    }
}