using System.Threading.Tasks;
using Microsoft.AspNet.Identity;
using SantaFinder.Entities;

namespace SantaFinder.Data.Identity
{
    public class SantaManager : AppUserManager<Santa>
    {
        public SantaManager(IUserStore<Santa> store) : base(store)
        {
        }
    }
}