namespace SantaFinder.Web.Areas.Auth.Models
{
    public abstract class RegisterModelBase
    {
        public string Email { get; set; }
        public string Password { get; set; }
        public string ConfirmPassword { get; set; }
    }
}