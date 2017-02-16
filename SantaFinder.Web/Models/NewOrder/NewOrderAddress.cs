using SantaFinder.Web.Models.Shared;

namespace SantaFinder.Web.Models
{
    public class NewOrderAddress
    {
        public bool UseDefaultAddress { get; set; }
        public AddressWithLocation CustomAddress { get; set; }
    }
}