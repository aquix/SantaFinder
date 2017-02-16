using SantaFinder.Entities;

namespace SantaFinder.Web.Areas.Auth.Models.ChangeProfile
{
    public class ClientProfileModel
    {
        public string Email { get; set; }
        public string Name { get; set; }
        public Address Address { get; set; }
    }
}