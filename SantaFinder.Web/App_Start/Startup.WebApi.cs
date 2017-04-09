using System.Web.Http;
using Microsoft.Owin.Security.OAuth;
using Owin;
using SantaFinder.Web.Util;
using Newtonsoft.Json.Serialization;

namespace SantaFinder.Web
{
    public partial class Startup
    {
        public void ConfigureWebApi(IAppBuilder app, HttpConfiguration config)
        {
            // Web API configuration and services
            // Configure Web API to use only bearer token authentication.
            config.SuppressDefaultHostAuthentication();
            config.Filters.Add(new HostAuthenticationFilter(OAuthDefaults.AuthenticationType));

            // Web API routes
            config.MapHttpAttributeRoutes();

            config.Routes.MapHttpRoute(
                name: "DefaultApi",
                routeTemplate: "api/{controller}/{id}",
                defaults: new { id = RouteParameter.Optional }
            );

            config.Formatters.JsonFormatter.SerializerSettings.ContractResolver = new CamelCasePropertyNamesContractResolver();
            config.Formatters.JsonFormatter.UseDataContractJsonSerializer = false;

            config.Formatters.Add(new SantaRegisterMultipartMediaTypeFormatter());

            app.UseWebApi(config);
        }
    }
}
