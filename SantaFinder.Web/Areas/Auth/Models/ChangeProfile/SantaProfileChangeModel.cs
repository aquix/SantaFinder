namespace SantaFinder.Web.Areas.Auth.Models.ChangeProfile
{
    public class SantaProfileChangeModel: IProfileChangeModel
    {
        public string Email { get; set; }
        public string Name { get; set; }
        public string Password { get; set; }
        public NewPasswordModel NewPassword { get; set; }
    }
}