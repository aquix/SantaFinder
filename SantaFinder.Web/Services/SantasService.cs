using System.Data.Entity;
using System.Linq;
using System.Threading.Tasks;
using SantaFinder.Data.Context;
using SantaFinder.Web.Models.Santas;
using SantaFinder.Web.Models.Shared;

namespace SantaFinder.Web.Services
{
    public class SantasService
    {
        private IDbContext _db;

        public SantasService(IDbContext db)
        {
            _db = db;
        }

        public async Task<PagedResponse<SantaInfoForClient>> GetAllSantas(int count, int page, string serverUri)
        {
            var santas = await _db.Santas
                .OrderByDescending(s => s.Rating)
                .Skip(page * count)
                .Take(count)
                .Select(s => new SantaInfoForClient
                {
                    Id = s.Id,
                    Name = s.Name,
                    NumberOfOrders = s.NumberOfOrders,
                    PhotoUrl = serverUri + "/static/santaPhotos/" + s.Id,
                    Rating = s.Rating
                })
                .ToListAsync();

            return new PagedResponse<SantaInfoForClient>
            {
                Items = santas,
                TotalCount =  await _db.Santas.CountAsync()
            };
        }
    }
}