using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using Autofac;
using Microsoft.AspNet.SignalR;
using Newtonsoft.Json;
using Owin;
using SantaFinder.Web.Util;
using SantaFinder.Web.Util.SignalR;
using Microsoft.Owin.Cors;
using Microsoft.Owin.Security.OAuth;
using Microsoft.AspNet.SignalR.Infrastructure;

namespace SantaFinder.Web
{
    public partial class Startup
    {
        public void ConfigureSignalR(IAppBuilder app, IContainer container)
        {
            var jsonSettings = new JsonSerializerSettings();
            jsonSettings.ContractResolver = new SignalRContractResolver();
            var serializer = JsonSerializer.Create(jsonSettings);

            var resolver = new Autofac.Integration.SignalR.AutofacDependencyResolver(container);
            resolver.Register(typeof(JsonSerializer), () => serializer);
            resolver.Register(typeof(IUserIdProvider), () => new CustomUserIdProvider());

            AutofacConfig.RegisterHubTypes(resolver).Update(container);

            app.Map("/signalr", map =>
            {
                map.UseCors(CorsOptions.AllowAll);

                map.UseOAuthBearerAuthentication(new OAuthBearerAuthenticationOptions()
                {
                    Provider = new QueryStringOAuthBearerProvider()
                });

                map.RunSignalR(new HubConfiguration
                {
                    Resolver = resolver
                });
            });

        }
    }
}