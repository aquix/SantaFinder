using System.Threading.Tasks;
using Microsoft.AspNet.Identity;
using SantaFinder.Entities;

namespace SantaFinder.Data.Identity
{
    public class ClientManager : AppUserManager<Client>
    {
        public ClientManager(IUserStore<Client> store) : base(store)
        {

        }
    }
}