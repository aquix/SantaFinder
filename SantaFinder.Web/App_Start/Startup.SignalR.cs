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

            var userIdProvider = new CustomUserIdProvider();
            resolver.Register(typeof(IUserIdProvider), () => userIdProvider);

            app.MapSignalR(new HubConfiguration
            {
                Resolver = resolver
            });
        }
    }
}