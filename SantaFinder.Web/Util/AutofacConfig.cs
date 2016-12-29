using System;
using System.Collections.Generic;
using System.Linq;
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
using SantaFinder.Data.Entities;
using SantaFinder.Web.Areas.Auth.Managers;

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
            builder.RegisterType<UserStore<User>>()
                .As<IUserStore<User>>();
            builder.Register(c => AppUserManager.Create(c.Resolve<IDataProtector>(), c.Resolve<AppDbContext>()));
        }
    }
}