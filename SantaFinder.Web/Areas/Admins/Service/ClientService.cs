using SantaFinder.Data.Context;
using SantaFinder.Entities;
using SantaFinder.Web.Models.Shared;
using SantaFinder.Web.Models.UsersList;
using System.Data.Entity;
using System.Linq;
using System.Threading.Tasks;

namespace SantaFinder.Web.Areas.Admins.Service
{
    public class ClientService
    {
        private IDbContext _db;

        AppDbContext dbContext = new AppDbContext();
        public ClientService(IDbContext db)
        {
            _db = db;
        }

        public async Task<PagedResponse<ClientInfo>> GetClientList(string clientId, int count, int page, string serverUri)
        {
            var listOfClients = _db.Clients;

            var clients = (await listOfClients
                .OrderByDescending(o => o.Name)
                .Skip(page * count)
                .Take(count)
                .ToListAsync())
                .Select(o => new ClientInfo
                {
                    Id = o.Id,
                    Email = o.Email,
                    Name = o.Name,
                    Address = o.Address
                });

            return new PagedResponse<ClientInfo>
            {
                Items = clients,
                TotalCount = await listOfClients.CountAsync()
            };
        }

    }
}