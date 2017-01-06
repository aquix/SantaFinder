using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Claims;
using System.Threading.Tasks;
using System.Web;
using Microsoft.AspNet.Identity;
using Microsoft.AspNet.Identity.EntityFramework;
using Microsoft.AspNet.Identity.Owin;
using Microsoft.Owin.Security.DataProtection;
using SantaFinder.Data.Context;

namespace SantaFinder.Web.Areas.Auth.Managers
{
    public class AppUserManager<T> : UserManager<T>
        where T: IdentityUser
    {
        public AppUserManager(IUserStore<T> store) : base(store) { }

        public static AppUserManager<T> Create(IDataProtector dataProtector, AppDbContext context)
        {
            var manager = new AppUserManager<T>(new UserStore<T>(context));
            // Configure validation logic for usernames
            manager.UserValidator = new UserValidator<T>(manager)
            {
                AllowOnlyAlphanumericUserNames = false,
                RequireUniqueEmail = true
            };
            // Configure validation logic for passwords
            manager.PasswordValidator = new PasswordValidator
            {
                RequiredLength = 5,
                RequireDigit = true
            };

            manager.UserTokenProvider = new DataProtectorTokenProvider<T>(dataProtector);

            return manager;
        }

        public async Task<ClaimsIdentity> GenerateUserIdentityAsync(T user, string authenticationType)
        {
            // Note the authenticationType must match the one defined in CookieAuthenticationOptions.AuthenticationType
            var userIdentity = await CreateIdentityAsync(user, authenticationType);
            // Add custom user claims here
            return userIdentity;
        }
    }
}