using Microsoft.AspNet.Identity;
using Microsoft.Owin.Security;
using SantaFinder.Data.Identity;
using SantaFinder.Entities;
using SantaFinder.Web.Areas.Auth.Models;
using System.Threading.Tasks;
using System.Web;
using System.Web.Http;

namespace SantaFinder.Web.Areas.Auth.Controllers
{
    [RoutePrefix("api/account/admin")]
    public class AdminAccountController : AccountController
    {
        private AppUserManager<Entities.Admin> _adminManager;
        private AppUserManager<User> _userManager;

        public AdminAccountController(AppUserManager<Entities.Admin> adminManager, AppUserManager<User> userManager,
            ISecureDataFormat<AuthenticationTicket> accessTokenFormat) : base(accessTokenFormat, userManager)
        {
            _adminManager = adminManager;
            _userManager = userManager;
        }

        [AllowAnonymous]
        [Route("register")]
        [HttpPost]
        public async Task<IHttpActionResult> Register(RegisterAdminModel model)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var admin = new Entities.Admin
            {
                UserName = model.Email,
                Email = model.Email,
                Name = model.Name,
            };

            IdentityResult result;
            var existingUser = await _userManager.FindByEmailAsync(admin.Email);

            if (existingUser != null)
            {
                result = IdentityResult.Failed(new[] { "User with this email already exists" });
            }
            else
            {
                result = await _adminManager.CreateAsync(admin, model.Password);
            }

            if (!result.Succeeded)
            {
                return GetErrorResult(result);
            }

            return Ok();
        }
    }
}