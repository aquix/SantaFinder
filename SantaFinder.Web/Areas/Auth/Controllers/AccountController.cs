using System;
using System.Threading.Tasks;
using System.Transactions;
using System.Web.Http;
using Microsoft.AspNet.Identity;
using Microsoft.Owin.Security;
using SantaFinder.Data.Identity;
using SantaFinder.Entities;
using SantaFinder.Web.Areas.Auth.Models.ChangeProfile;
using SantaFinder.Web.Areas.Auth.Utils;

namespace SantaFinder.Web.Areas.Auth.Controllers
{
    [Authorize]
    [RoutePrefix("api/account")]
    public class AccountController : ApiController
    {
        private const string LocalLoginProvider = "Local";

        private ISecureDataFormat<AuthenticationTicket> _accessTokenFormat;
        private AppUserManager<User> _commonUserManager;

        public AccountController(ISecureDataFormat<AuthenticationTicket> accessTokenFormat, AppUserManager<User> commonUserManager)
        {
            _accessTokenFormat = accessTokenFormat;
            _commonUserManager = commonUserManager;
        }

        protected async Task<IHttpActionResult> ChangeProfileInternal<T>(UserManager<T> userManager, IProfileChangeModel model, Action<User> updateModel)
            where T : User
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            using (var scope = new TransactionScope(TransactionScopeAsyncFlowOption.Enabled))
            {
                IdentityResult result;
                try
                {
                    var id = User.Identity.GetUserId();
                    var user = await userManager.FindByIdAsync(id);

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
                                    if (!result.Succeeded)
                                    {
                                        throw new ChangeProfileException(result);
                                    }
                                }
                                else
                                {
                                    throw new ChangeProfileException(IdentityResult.Failed(new[] { "Passwords don't match" }));
                                }
                            }
                        }
                        else
                        {
                            throw new ChangeProfileException(IdentityResult.Failed(new[] { "Incorrect password" }));
                        }

                        var existingUserWithThisEmail = await _commonUserManager.FindByEmailAsync(user.Email);
                        if (existingUserWithThisEmail != null && existingUserWithThisEmail.Id != user.Id)
                        {
                            throw new ChangeProfileException(IdentityResult.Failed(new[] { "User with this email already exists" }));
                        }

                        result = await userManager.UpdateAsync(user);
                        if (!result.Succeeded)
                        {
                            throw new ChangeProfileException(result);
                        }
                    }
                    else
                    {
                        throw new ChangeProfileException(IdentityResult.Failed(new[] { "User does not exists" }));
                    }

                    scope.Complete();
                    return Ok();
                }
                catch (ChangeProfileException ex)
                {
                    scope.Dispose();
                    return GetErrorResult(ex.Result);
                }
                catch (Exception ex)
                {
                    scope.Dispose();
                    return GetErrorResult(IdentityResult.Failed(ex.Message));
                }
            }
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
