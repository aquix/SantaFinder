using System.Data.Entity;
using System.Threading.Tasks;
using Microsoft.AspNet.Identity.EntityFramework;
using SantaFinder.Entities;

namespace SantaFinder.Data.Context
{
    public interface IDbContext
    {
        IDbSet<User> Users { get; set; }
        IDbSet<IdentityRole> Roles { get; set; }
        DbSet<Client> Clients { get; set; }
        DbSet<Santa> Santas { get; set; }
        DbSet<Admin> Admins { get; set; }
        DbSet<Order> Orders { get; set; }
        DbSet<Present> Presents { get; set; }
        DbSet<ChatMessage> ChatMessages { get; set; }

        int SaveChanges();
        Task<int> SaveChangesAsync();
    }
}
