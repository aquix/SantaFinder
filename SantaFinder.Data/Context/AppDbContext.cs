using System;
using System.Collections.Generic;
using System.Data.Entity;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Microsoft.AspNet.Identity.EntityFramework;
using SantaFinder.Data.Entities;

namespace SantaFinder.Data.Context
{
    public class AppDbContext : IdentityDbContext<User>, IDbContext
    {
        public AppDbContext()
            : base("DefaultConnection", throwIfV1Schema: false) { }

        public static AppDbContext Create() => new AppDbContext();

        public DbSet<Client> Clients { get; set; }
        public DbSet<Santa> Santas { get; set; }
        public DbSet<Order> Orders { get; set; }
        public DbSet<Present> Presents { get; set; }

        //protected override void OnModelCreating(DbModelBuilder modelBuilder)
        //{
        //    modelBuilder.Entity<Order>()
        //        .HasMany(o => o.Presents)
        //        .WithRequired();

        //    base.OnModelCreating(modelBuilder);
        //}
    }
}
