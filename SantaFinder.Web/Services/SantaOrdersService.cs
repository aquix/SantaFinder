using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using System.Web;
using SantaFinder.Data.Context;
using SantaFinder.Data.Entities;
using SantaFinder.Web.Models.OrdersOnMap;
using SantaFinder.Web.Models.SantaOrders;
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

        public IEnumerable<SantaOrderPreview> GetAllOrders(string santaId)
        {
            return _db.Orders
                .Where(o => o.SantaId == santaId)
                .Select(o => new SantaOrderPreview
                {
                    Id = o.Id,
                    ClientName = o.Client.Name,
                    Address = o.Address,
                    Datetime = o.Datetime,
                    Status = o.Status
                });
        }

        public async Task<OrderFullInfo> GetDetails(int orderId)
        {
            var order = await _db.Orders.FindAsync(orderId);
            if (order != null)
            {
                return new OrderFullInfo(order);
            }
            else
            {
                return null;
            }
        }

        public async Task<bool> CompleteOrder(int orderId)
        {
            var order = await _db.Orders.FindAsync(orderId);
            if (order != null)
            {
                order.Status = OrderStatus.Completed;
                await _db.SaveChangesAsync();
                return true;
            }
            else
            {
                return false;
            }
        }

        public async Task<bool> DiscardOrder(int orderId)
        {
            var order = await _db.Orders.FindAsync(orderId);
            if (order != null)
            {
                order.Status = OrderStatus.New;
                order.Santa = null;
                order.SantaId = null;
                await _db.SaveChangesAsync();
                return true;
            }
            else
            {
                return false;
            }
        }
    }
}