namespace SantaFinder.Data.Migrations
{
    using System;
    using System.Data.Entity;
    using System.Data.Entity.Migrations;
    using System.Linq;
    using Microsoft.AspNet.Identity.EntityFramework;
    using SantaFinder.Data.Identity;
    using SantaFinder.Entities;
    using Microsoft.AspNet.Identity;

    internal sealed class Configuration : DbMigrationsConfiguration<SantaFinder.Data.Context.AppDbContext>
    {
        public Configuration()
        {
            AutomaticMigrationsEnabled = false;
        }

        protected override void Seed(SantaFinder.Data.Context.AppDbContext context)
        {
            //  This method will be called after migrating to the latest version.

            //  You can use the DbSet<T>.AddOrUpdate() helper extension method 
            //  to avoid creating duplicate seed data. E.g.
            //
            //    context.People.AddOrUpdate(
            //      p => p.FullName,
            //      new Person { FullName = "Andrew Peters" },
            //      new Person { FullName = "Brice Lambson" },
            //      new Person { FullName = "Rowan Miller" }
            //    );
            //

            context.Roles.AddOrUpdate(r => r.Name,
                new IdentityRole { Name = "santa" },
                new IdentityRole { Name = "client" },
                new IdentityRole { Name = "admin" }
            );

            var userManager = new AppUserManager<Admin>(new UserStore<Admin>(context));

            if (userManager.FindByName("admin") == null)
            {
                var admin = new Admin
                {
                    UserName = "admin",
                    Email = "admin@adminemail.com"
                };
                var adminPassword = "adminpass";
                userManager.Create(admin, adminPassword);
                userManager.AddToRole(admin.Id, "admin");
            }
        }
    }
}
