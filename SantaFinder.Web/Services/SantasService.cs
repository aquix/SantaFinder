using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using System.Web;
using SantaFinder.Data.Context;
using SantaFinder.Web.Models.Santas;

namespace SantaFinder.Web.Services
{
    public class SantasService
    {
        private IDbContext _db;

        public SantasService(IDbContext db)
        {
            _db = db;
        }

        public IEnumerable<SantaInfoForClient> GetAllSantas()
        {
            return _db.Santas.Select(s => new SantaInfoForClient
            {
                Id = s.Id,
                Name = s.Name,
                NumberOfOrders = s.NumberOfOrders,
                PhotoPath = s.PhotoPath,
                Rating = s.Rating
            });
        }
    }
}