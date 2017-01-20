using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using SantaFinder.Data.Context;
using SantaFinder.Web.Models.OrdersOnMap;
using SantaFinder.Web.Models.Shared;

namespace SantaFinder.Web.Services
{
    public class SantaOrdersService
    {
        private IDbContext _db;

        public SantaOrdersService(IDbContext db)
        {
            _db = db;
        }

        public IEnumerable<OrderFullInfo> GetAllOrders(string santaId)
        {
            return _db.Orders
                .Where(o => o.SantaId == santaId)
                .Select(o => new OrderFullInfo(o));
        }
    }
}