using System;
using System.Threading.Tasks;
using System.Web.Http;
using Microsoft.AspNet.Identity;
using Microsoft.Owin.Security;
using SantaFinder.Data.Identity;
using SantaFinder.Entities;
using SantaFinder.Web.Areas.Auth.Models;
using SantaFinder.Web.Areas.Auth.Models.ChangeProfile;


namespace SantaFinder.Web.Areas.Auth.Controllers
{
    [RoutePrefix("api/account/client")]
    [Authorize(Roles ="client")]
    public class ClientAccountController : AccountController
    {
        private AppUserManager<Client> _clientManager;
        private AppUserManager<User> _userManager;

        public ClientAccountController(AppUserManager<Client> clientManager, AppUserManager<User> userManager,
            ISecureDataFormat<AuthenticationTicket> accessTokenFormat) : base(accessTokenFormat, userManager)
        {
            _clientManager = clientManager;
            _userManager = userManager;
        }

        [AllowAnonymous]
        [Route("register")]
        [HttpPost]
        public async Task<IHttpActionResult> Register(RegisterClientModel model)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var client = new Client
            {
                UserName = model.Email,
                Email = model.Email,
                Name = model.Name,
                Address = model.Address,
                Location = model.Location
            };

            IdentityResult result;
            var existingUser = await _userManager.FindByEmailAsync(client.Email);

            if (existingUser != null)
            {
                result = IdentityResult.Failed(new[] { "User with this email already exists" });
            }
            else
            {
                result = await _clientManager.CreateAsync(client, model.Password);
            }

            if (!result.Succeeded)
            {
                return GetErrorResult(result);
            }

            return Ok();
        }

        [HttpGet]
        [Route("profile")]
        public async Task<ClientProfileModel> GetProfile()
        {
            var id = User.Identity.GetUserId();
            var user = await _clientManager.FindByIdAsync(id);

            return new ClientProfileModel
            {
                Email = user.Email,
                Name = user.Name,
                Address = user.Address
            };
        }

        [HttpPost]
        [Route("profile")]
        public async Task<IHttpActionResult> ChangeProfile(ClientProfileChangeModel model)
        {
            return await ChangeProfileInternal(_clientManager, model, user =>
            {
                var client = user as Client;
                client.Email = model.Email;
                client.UserName = model.Email;
                client.Name = model.Name;
                client.Address = model.Address.Line;
                client.Location = model.Address.Location;
            });
        }
    }
}
