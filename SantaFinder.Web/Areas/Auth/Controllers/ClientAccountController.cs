using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Threading.Tasks;
using System.Web.Http;
using Microsoft.AspNet.Identity;
using Microsoft.Owin.Security;
using SantaFinder.Data.Entities;
using SantaFinder.Web.Areas.Auth.Managers;
using SantaFinder.Web.Areas.Auth.Models;

namespace SantaFinder.Web.Areas.Auth.Controllers
{
    [RoutePrefix("api/account/client")]
    public class ClientAccountController : AccountController
    {
        private AppUserManager<Client> _clientManager;
        private AppUserManager<User> _userManager;

        public ClientAccountController(AppUserManager<Client> clientManager, AppUserManager<User> userManager,
            ISecureDataFormat<AuthenticationTicket> accessTokenFormat) : base(accessTokenFormat)
        {
            _clientManager = clientManager;
            _userManager = userManager;
        }

        [AllowAnonymous]
        [Route("register")]
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
                Address = new Address
                {
                    City = model.Address.City,
                    Street = model.Address.Street,
                    House = model.Address.House,
                    Apartment = model.Address.Apartment
                }
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
    }
}
