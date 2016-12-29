using System;
using System.Collections.Generic;
using System.Linq;
using System.Web.Http;
using Microsoft.Owin;
using Owin;

[assembly: OwinStartup(typeof(SantaFinder.Web.Startup))]

namespace SantaFinder.Web
{
    public partial class Startup
    {
        public void Configuration(IAppBuilder app)
        {
            var config = new HttpConfiguration();
            var autofacContainer = ConfigureAutofac(app, config);

            ConfigureCors(app);
            ConfigureAuth(app);
            ConfigureWebApi(app, config);
        }
    }
}
