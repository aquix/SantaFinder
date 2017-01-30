namespace SantaFinder.Data.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    using System.Diagnostics;
    using System.IO;
    using System.Linq;
    using Context;
    using Entities;
    using Identity;
    using Microsoft.AspNet.Identity;
    using Microsoft.AspNet.Identity.EntityFramework;
    using Microsoft.Owin.Security.DataProtection;

    public partial class ApplyRolesForExistingUsers : DbMigration
    {
        public override void Up()
        {
            if (System.Diagnostics.Debugger.IsAttached == false)
                System.Diagnostics.Debugger.Launch();

            var db = new AppDbContext();
            var clientIds = db.Clients.Select(c => c.Id).ToList();
            var santaIds = db.Santas.Select(s => s.Id).ToList();
            var ids = (string.Join(", ", clientIds));
            
            File.WriteAllText("D:\\out.txt", ids);
            var userManager = AppUserManager<User>.Create(new MockDataProtector(), db);
            foreach (var clientId in clientIds)
            {
                userManager.AddToRole(clientId, "client");
            }

            foreach (var santaId in santaIds)
            {
                userManager.AddToRole(santaId, "santa");
            }
        }

        public override void Down()
        {
        }
    }

    public class MockDataProtector : IDataProtector
    {
        public byte[] Protect(byte[] userData)
        {
            return userData;
        }

        public byte[] Unprotect(byte[] protectedData)
        {
            return protectedData;
        }
    }
}
