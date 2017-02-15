using System;
using System.Threading.Tasks;
using System.Web.Http;
using Microsoft.AspNet.Identity;
using Microsoft.Owin.Security;
using SantaFinder.Data.Identity;
using SantaFinder.Entities;
using SantaFinder.Web.Areas.Auth.Models.ChangeProfile;

namespace SantaFinder.Web.Areas.Auth.Controllers
{
    [Authorize]
    [RoutePrefix("api/Account")]
    public class AccountController : ApiController
    {
        private const string LocalLoginProvider = "Local";

        public ISecureDataFormat<AuthenticationTicket> _accessTokenFormat;

        public AccountController(ISecureDataFormat<AuthenticationTicket> accessTokenFormat)
        {
            _accessTokenFormat = accessTokenFormat;
        }

        protected async Task<IHttpActionResult> ChangeProfileInternal<T>(UserManager<T> userManager, IProfileChangeModel model, Action<User> updateModel)
            where T: User
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var id = User.Identity.GetUserId();
            var user = await userManager.FindByIdAsync(id);

            IdentityResult result;

            if (user != null)
            {
                if (await userManager.CheckPasswordAsync(user, model.Password))
                {
                    updateModel(user);

                    if (!string.IsNullOrEmpty(model.NewPassword.Password) && !string.IsNullOrEmpty(model.NewPassword.PasswordConfirmation))
                    {
                        if (model.NewPassword.Password == model.NewPassword.PasswordConfirmation)
                        {
                            result = await userManager.ChangePasswordAsync(user.Id, model.Password, model.NewPassword.Password);
                        }
                        else
                        {
                            result = IdentityResult.Failed(new[] { "Password don't match" });
                            return GetErrorResult(result);
                        }
                    }

                }
                else
                {
                    result = IdentityResult.Failed(new[] { "Incorrect password" });
                    return GetErrorResult(result);
                }

                result = await userManager.UpdateAsync(user);
            }
            else
            {
                result = IdentityResult.Failed(new[] { "User does not exist" });
            }

            if (!result.Succeeded)
            {
                return GetErrorResult(result);
            }

            return Ok();
        }

        #region Helpers

        protected IHttpActionResult GetErrorResult(IdentityResult result)
        {
            if (result == null)
            {
                return InternalServerError();
            }

            if (!result.Succeeded)
            {
                if (result.Errors != null)
                {
                    foreach (string error in result.Errors)
                    {
                        ModelState.AddModelError("", error);
                    }
                }

                if (ModelState.IsValid)
                {
                    // No ModelState errors are available to send, so just return an empty BadRequest.
                    return BadRequest();
                }

                return BadRequest(ModelState);
            }

            return null;
        }

        #endregion
    }
}
