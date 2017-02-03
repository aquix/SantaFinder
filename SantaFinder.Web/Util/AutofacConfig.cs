using System.Reflection;
using System.Web;
using Autofac;
using Autofac.Integration.WebApi;
using Microsoft.Owin.Security;
using Microsoft.Owin.Security.DataProtection;
using Microsoft.Owin.Security.DataHandler;
using Microsoft.Owin.Security.DataHandler.Serializer;
using Owin;
using Microsoft.AspNet.Identity.EntityFramework;
using Microsoft.AspNet.Identity;
using SantaFinder.Data.Context;
using SantaFinder.Web.Services;
using SantaFinder.Entities;
using SantaFinder.Data.Identity;

namespace SantaFinder.Web.Util
{
    public class AutofacConfig
    {
        public static IContainer Configure(IAppBuilder app)
        {
            var builder = new ContainerBuilder();

            RegisterTypes(builder, app);

            builder.RegisterApiControllers(Assembly.GetExecutingAssembly());

            return builder.Build();
        }

        private static void RegisterTypes(ContainerBuilder builder, IAppBuilder app)
        {
            // Identity specific
            builder.RegisterType<TicketDataFo‌​rmat>()
                .As<ISecureDataFormat<AuthenticationTicket>>();
            builder.RegisterType<TicketSerializer>()
                .As<IDataSerializer<AuthenticationTicket>>();
            builder.Register(c => app.GetDataProtectionProvider().Create("ASP.NET Identity"))
                .As<IDataProtector>();
            builder.Register(c => HttpContext.Current.GetOwinContext().Authentication);

            builder.RegisterType<AppDbContext>()
                .AsSelf();
            builder.Register<IDbContext>(c => c.Resolve<AppDbContext>());
            builder.RegisterType<UserStore<Client>>()
                .As<IUserStore<Client>>();
            builder.RegisterType<UserStore<Santa>>()
                .As<IUserStore<Santa>>();
            builder.Register(c => AppUserManager<User>.Create(c.Resolve<IDataProtector>(), c.Resolve<AppDbContext>()));
            builder.Register(c => AppUserManager<Client>.Create(c.Resolve<IDataProtector>(), c.Resolve<AppDbContext>()));
            builder.Register(c => AppUserManager<Santa>.Create(c.Resolve<IDataProtector>(), c.Resolve<AppDbContext>()));
            builder.Register(c => AppRoleManager.Create(c.Resolve<AppDbContext>()));

            builder.RegisterType<OrdersService>()
                .AsSelf();
            builder.RegisterType<SantaOrdersService>()
                .AsSelf();
            builder.RegisterType<SantasService>()
                .AsSelf();
            builder.RegisterType<StaticService>()
                .AsSelf();
        }
    }
}