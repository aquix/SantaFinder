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
    [RoutePrefix("api/account/santa")]
    public class SantaAccountController : AccountController
    {
        private AppUserManager<Santa> _santaManager;

        public SantaAccountController(AppUserManager<Santa> santaManager,
            ISecureDataFormat<AuthenticationTicket> accessTokenFormat) : base(accessTokenFormat)
        {
            _santaManager = santaManager;
        }

        [AllowAnonymous]
        [Route("register")]
        public async Task<IHttpActionResult> Register(RegisterSantaModel model)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var santa = new Santa
            {
                UserName = model.Email,
                Email = model.Email,
                Name = model.Name
            };

            IdentityResult result = await _santaManager.CreateAsync(santa, model.Password);

            if (!result.Succeeded)
            {
                return GetErrorResult(result);
            }

            return Ok();
        }
    }
}
