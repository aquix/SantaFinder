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
using SantaFinder.Web.Areas.Auth.Models.ChangeProfile;

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

        [Route("getClient")]
        public ClientModel GetClientModel()
        {
            var id = User.Identity.GetUserId();
            var user = _clientManager.FindById(id);

            var clientViewModel = new ClientModel
            {
                Email = user.Email,
                Name = user.Name,
                Address = user.Address
            };

            return clientViewModel;
        }

        [Route("profile")]
        [HttpPost]
        public async Task<IHttpActionResult> ChangeProfile(ClientModelChange model)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var id = User.Identity.GetUserId();
            var existingUser = _clientManager.FindById(id);

            IdentityResult result;

            if (existingUser != null)
            {
                existingUser.UserName = model.Email;
                existingUser.Email = model.Email;
                existingUser.Name = model.Name;
                existingUser.Address.City = model.Address.City;
                existingUser.Address.Street = model.Address.Street;
                existingUser.Address.House = model.Address.House;
                existingUser.Address.Apartment = model.Address.Apartment;

                result = await _clientManager.UpdateAsync(existingUser);

                await _clientManager.ChangePasswordAsync(id, model.Passwords.OldPassword, model.Passwords.Password);
            }
            else
            {
                result = IdentityResult.Failed(new[] { "Update failed" });
            }

            if (!result.Succeeded)
            {
                return GetErrorResult(result);
            }

            return Ok();
        }
    }
}
