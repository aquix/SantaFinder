﻿using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Net.Http.Formatting;
using System.Threading.Tasks;
using System.Web;
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
        private AppUserManager<User> _userManager;

        public SantaAccountController(AppUserManager<Santa> santaManager, AppUserManager<User> userManager,
            ISecureDataFormat<AuthenticationTicket> accessTokenFormat) : base(accessTokenFormat)
        {
            _santaManager = santaManager;
            _userManager = userManager;
        }

        [AllowAnonymous]
        [Route("register")]
        [HttpPost]
        public async Task<IHttpActionResult> Register(RegisterSantaModel model)
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
                    var photoPath = HttpContext.Current.Server.MapPath("~/App_Data/Photos");
                    if (!Directory.Exists(photoPath))
                    {
                        Directory.CreateDirectory(photoPath);
                    }

                    var fileExtension = Path.GetExtension(model.Photo.Filename);
                    var filename = $"{santa.Id}{fileExtension}";

                    photoPath = Path.Combine(photoPath, filename);
                    File.WriteAllBytes(photoPath, model.Photo.Content);
                    santa.PhotoPath = photoPath;
                    await _santaManager.UpdateAsync(santa);
                }
            }

            if (!result.Succeeded)
            {
                return GetErrorResult(result);
            }

            return Ok();
        }
    }
}
