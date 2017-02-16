using Microsoft.AspNet.Identity;
using Microsoft.AspNet.Identity.EntityFramework;
using SantaFinder.Data.Context;

namespace SantaFinder.Data.Identity
{
    public class AppRoleManager : RoleManager<IdentityRole>
    {
        public AppRoleManager(RoleStore<IdentityRole> store)
                : base(store) { }

        public static AppRoleManager Create(AppDbContext context)
        {
            return new AppRoleManager(new RoleStore<IdentityRole>(context));
        }
    }
}