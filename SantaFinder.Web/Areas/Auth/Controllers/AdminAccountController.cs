using Microsoft.AspNet.Identity;
using Microsoft.Owin.Security;
using SantaFinder.Data.Identity;
using SantaFinder.Entities;
using SantaFinder.Web.Areas.Auth.Models;
using System.IO;
using System.Threading.Tasks;
using System.Web;
using System.Web.Http;

namespace SantaFinder.Web.Areas.Auth.Controllers
{
    [RoutePrefix("api/account/admin")]
    public class AdminAccountController : AccountController
    {
        private AppUserManager<Santa> _santaManager;
        private AppUserManager<User> _userManager;
        private AppUserManager<Admin> _userAdmin;

        public AdminAccountController(AppUserManager<Santa> santaManager, /*AppUserManager<Admin> adminManager,*/ AppUserManager<User> userManager,
            ISecureDataFormat<AuthenticationTicket> accessTokenFormat) : base(accessTokenFormat, userManager)
        {
            _santaManager = santaManager;
            _userManager = userManager;
            //_userAdmin = adminManager;
        }

        [AllowAnonymous]
        [Route("register")]
        [HttpPost]
        public async Task<IHttpActionResult> Register(RegisterAdminModel model)
        {
            //var model = new RegisterSantaModel();

            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            IdentityResult result;
            var existingUser = await _userManager.FindByEmailAsync(model.Email);

            if (existingUser != null)
            {
                result = IdentityResult.Failed(new[] { "User with this email already exists" });
            }
            else
            {
                var santa = new Santa
                {
                    UserName = model.Email,
                    Email = model.Email,
                    Name = model.Name,
                    PhotoPath = ""
                };

                result = await _santaManager.CreateAsync(santa, model.Password);

                if (result.Succeeded)
                {
                    //var photoPath = HttpContext.Current.Server.MapPath("~/App_Data/Photos");
                    //if (!Directory.Exists(photoPath))
                    //{
                    //    Directory.CreateDirectory(photoPath);
                    //}

                    //var fileExtension = Path.GetExtension(model.Photo.Filename);
                    //var filename = $"{santa.Id}{fileExtension}";

                    //photoPath = Path.Combine(photoPath, filename);
                    //File.WriteAllBytes(photoPath, model.Photo.Content);
                    //santa.PhotoPath = photoPath;
                    await _santaManager.UpdateAsync(santa);
                }
            }

            if (!result.Succeeded)
            {
                return GetErrorResult(result);
            }

            return Ok();
        }

        //private AppUserManager<Entities.Admin> _adminManager;
        //private AppUserManager<User> _userManager;

        //public AdminAccountController(AppUserManager<Entities.Admin> adminManager, AppUserManager<User> userManager,
        //    ISecureDataFormat<AuthenticationTicket> accessTokenFormat) : base(accessTokenFormat, userManager)
        //{
        //    _adminManager = adminManager;
        //    _userManager = userManager;
        //}

        //[AllowAnonymous]
        //[Route("register")]
        //[HttpPost]
        //public async Task<IHttpActionResult> Register(RegisterAdminModel model)
        //{
        //    if (!ModelState.IsValid)
        //    {
        //        return BadRequest(ModelState);
        //    }

        //    var admin = new Entities.Admin
        //    {
        //        UserName = model.Email,
        //        Email = model.Email,
        //        Name = model.Name,
        //    };

        //    IdentityResult result;
        //    var existingUser = await _userManager.FindByEmailAsync(admin.Email);

        //    if (existingUser != null)
        //    {
        //        result = IdentityResult.Failed(new[] { "User with this email already exists" });
        //    }
        //    else
        //    {
        //        result = await _adminManager.CreateAsync(admin, model.Password);
        //    }

        //    if (!result.Succeeded)
        //    {
        //        return GetErrorResult(result);
        //    }

        //    return Ok();
        //}
    }
}