using SantaFinder.Entities;
using SantaFinder.Web.Models.Shared;

namespace SantaFinder.Web.Areas.Auth.Models.ChangeProfile
{
    public class ClientProfileChangeModel: IProfileChangeModel
    {
        public string Email { get; set; }
        public string Name { get; set; }
        public AddressWithLocation Address { get; set; }
        public string Password { get; set; }
        public NewPasswordModel NewPassword { get; set; }
    }
}