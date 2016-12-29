using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Http;
using Autofac;
using Autofac.Integration.WebApi;
using Owin;
using SantaFinder.Web.Util;

namespace SantaFinder.Web
{
    public partial class Startup
    {
        public IContainer ConfigureAutofac(IAppBuilder app, HttpConfiguration config)
        {
            var container = AutofacConfig.Configure(app);
            config.DependencyResolver = new AutofacWebApiDependencyResolver(container);

            app.UseAutofacMiddleware(container);
            app.UseAutofacWebApi(config);

            return container;
        }
    }
}