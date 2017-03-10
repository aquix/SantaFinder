using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Claims;
using System.Threading.Tasks;
using Autofac;
using Microsoft.Owin.Security;
using Microsoft.Owin.Security.Cookies;
using Microsoft.Owin.Security.OAuth;
using SantaFinder.Data.Identity;
using SantaFinder.Entities;
using Microsoft.AspNet.Identity;

namespace SantaFinder.Web.Auth.Providers
{
    public class ApplicationOAuthProvider : OAuthAuthorizationServerProvider
    {
        private readonly string _publicClientId;

        public ApplicationOAuthProvider(string publicClientId)
        {
            if (publicClientId == null)
            {
                throw new ArgumentNullException("publicClientId");
            }

            _publicClientId = publicClientId;
        }

        public override async Task GrantResourceOwnerCredentials(OAuthGrantResourceOwnerCredentialsContext context)
        {
            var autofacLifetimeScope = Autofac.Integration.Owin.OwinContextExtensions.GetAutofacLifetimeScope(context.OwinContext);
            var clientManager = autofacLifetimeScope.Resolve<AppUserManager<Client>>();
            var santaManager = autofacLifetimeScope.Resolve<AppUserManager<Santa>>();
            var userType = context.OwinContext.Get<UserType>("usertype");

            ClaimsIdentity oAuthIdentity = null;
            ClaimsIdentity cookiesIdentity = null;
            User user;

            if (userType == UserType.Client)
            {
                var client = clientManager.Find(context.UserName, context.Password);
                if (client != null)
                {
                    oAuthIdentity = await clientManager.GenerateUserIdentityAsync(client, OAuthDefaults.AuthenticationType);
                    cookiesIdentity = await clientManager.GenerateUserIdentityAsync(client, CookieAuthenticationDefaults.AuthenticationType);
                }

                user = client;
            }
            else
            {
                var santa = await santaManager.FindAsync(context.UserName, context.Password);
                if (santa != null)
                {
                    oAuthIdentity = await santaManager.GenerateUserIdentityAsync(santa, OAuthDefaults.AuthenticationType);
                    cookiesIdentity = await santaManager.GenerateUserIdentityAsync(santa, CookieAuthenticationDefaults.AuthenticationType);
                }

                user = santa;
            }

            if (user == null)
            {
                context.SetError("invalid_grant", "The user name or password is incorrect.");
                return;
            }

            AuthenticationProperties properties = CreateProperties(user.Email, user.Id, userType);
            AuthenticationTicket ticket = new AuthenticationTicket(oAuthIdentity, properties);
            context.Validated(ticket);
            context.Request.Context.Authentication.SignIn(cookiesIdentity);
        }

        public override Task TokenEndpoint(OAuthTokenEndpointContext context)
        {
            foreach (KeyValuePair<string, string> property in context.Properties.Dictionary)
            {
                context.AdditionalResponseParameters.Add(property.Key, property.Value);
            }

            return Task.FromResult<object>(null);
        }

        public override Task ValidateClientAuthentication(OAuthValidateClientAuthenticationContext context)
        {
            // Resource owner password credentials does not provide a client ID.
            if (context.ClientId == null)
            {
                var userTypeRaw = context.Parameters.FirstOrDefault(p => p.Key == "usertype").Value?.FirstOrDefault();
                if (userTypeRaw != null)
                {
                    UserType userType;
                    var isCorrectType = Enum.TryParse(userTypeRaw, out userType);
                    if (isCorrectType)
                    {
                        context.OwinContext.Set("usertype", userType);
                        context.Validated();
                    }
                }
            }

            return Task.FromResult<object>(null);
        }

        public override Task ValidateClientRedirectUri(OAuthValidateClientRedirectUriContext context)
        {
            if (context.ClientId == _publicClientId)
            {
                Uri expectedRootUri = new Uri(context.Request.Uri, "/");

                if (expectedRootUri.AbsoluteUri == context.RedirectUri)
                {
                    context.Validated();
                }
            }

            return Task.FromResult<object>(null);
        }

        public static AuthenticationProperties CreateProperties(string email, string userId, UserType userType)
        {
            IDictionary<string, string> data = new Dictionary<string, string>
            {
                { "email", email },
                { "userId", userId },
                { "userType", ((int)userType).ToString() }
            };
            return new AuthenticationProperties(data);
        }
    }
}