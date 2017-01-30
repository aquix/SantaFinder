namespace SantaFinder.Data.Migrations
{
    using System.Data.Entity.Migrations;
    using System.Linq;
    using Context;
    using Entities;
    using Identity;
    using Microsoft.AspNet.Identity;
    using Microsoft.AspNet.Identity.EntityFramework;

    public partial class ApplyRolesForExistingUsers : DbMigration
    {
        public override void Up()
        {
            var db = new AppDbContext();
            var userManager = new AppUserManager<User>(new UserStore<User>(db));

            foreach (var clientId in db.Clients.Select(c => c.Id).ToList())
            {
                userManager.AddToRole(clientId, "client");
            }

            foreach (var santaId in db.Santas.Select(s => s.Id).ToList())
            {
                userManager.AddToRole(santaId, "santa");
            }
        }

        public override void Down()
        {
            var db = new AppDbContext();
            var userManager = new AppUserManager<User>(new UserStore<User>(db));

            foreach (var clientId in db.Clients.Select(c => c.Id).ToList())
            {
                userManager.RemoveFromRole(clientId, "client");
            }

            foreach (var santaId in db.Santas.Select(s => s.Id).ToList())
            {
                userManager.RemoveFromRole(santaId, "santa");
            }
        }
    }
}
