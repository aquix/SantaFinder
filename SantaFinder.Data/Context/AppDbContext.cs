using System.Data.Entity;
using Microsoft.AspNet.Identity.EntityFramework;
using SantaFinder.Entities;

namespace SantaFinder.Data.Context
{
    public class AppDbContext : IdentityDbContext<User>, IDbContext
    {
        public AppDbContext()
            : base("DefaultConnection", throwIfV1Schema: false) { }

        public static AppDbContext Create() => new AppDbContext();

        public DbSet<Client> Clients { get; set; }
        public DbSet<Santa> Santas { get; set; }
        public DbSet<Admin> Admins { get; set; }
        public DbSet<Order> Orders { get; set; }
        public DbSet<Present> Presents { get; set; }
        public DbSet<ChatMessage> ChatMessages { get; set; }
    }
}
