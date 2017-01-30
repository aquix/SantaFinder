using System.Data.Entity;
using System.Linq;
using System.Threading.Tasks;
using SantaFinder.Data.Context;
using SantaFinder.Entities;
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

        public async Task<PagedResponse<SantaOrderPreview>> GetAllOrders(string santaId, SantaOrderStatusFilter filter, int count, int page)
        {
            var allSantaOrders = _db.Orders
                .Where(o => o.SantaId == santaId);

            switch (filter)
            {
            case SantaOrderStatusFilter.Approved:
                allSantaOrders = allSantaOrders.Where(o => o.Status == OrderStatus.Approved);
                break;
            case SantaOrderStatusFilter.Completed:
                allSantaOrders = allSantaOrders.Where(o => o.Status == OrderStatus.Completed);
                break;
            }

            var orders = await allSantaOrders
                .OrderByDescending(o => o.Datetime)
                .Skip(page * count)
                .Take(count)
                .Select(o => new SantaOrderPreview
                {
                    Id = o.Id,
                    ClientName = o.Client.Name,
                    Address = o.Address,
                    Datetime = o.Datetime,
                    Status = o.Status
                })
                .ToListAsync();

            return new PagedResponse<SantaOrderPreview>
            {
                Items = orders,
                TotalCount = await allSantaOrders.CountAsync()
            };
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

        public async Task<bool> CompleteOrder(string santaId, int orderId)
        {
            var order = await _db.Orders.FindAsync(orderId);
            if (order != null)
            {
                order.Status = OrderStatus.Completed;

                var me = await _db.Santas.FindAsync(santaId);
                me.NumberOfOrders++;

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