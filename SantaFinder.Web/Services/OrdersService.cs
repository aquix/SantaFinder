using System.Collections.Generic;
using System.Data.Entity;
using System.Data.Entity.Validation;
using System.Linq;
using System.Threading.Tasks;
using SantaFinder.Data.Context;
using SantaFinder.Entities;
using SantaFinder.Web.Models;
using SantaFinder.Web.Models.OrderHistory;
using SantaFinder.Web.Models.OrdersOnMap;
using SantaFinder.Web.Models.Shared;

namespace SantaFinder.Web.Services
{
    public class OrdersService
    {
        private IDbContext _db;
        AppDbContext dbContext = new AppDbContext();
        public OrdersService(IDbContext db)
        {
            _db = db;
        }

        public async Task<bool> CreateOrder(NewOrder newOrder, string userId)
        {
            var order = new Order
            {
                ClientId = userId,
                ChildrenNames = newOrder.ChildrenNames,
                Datetime = newOrder.Datetime,
                UseProfileAddress = newOrder.Address.UseDefaultAddress,
                Address = new Address(),
                Location = new Location(),
                Status = OrderStatus.New
            };

            if (!order.UseProfileAddress)
            {
                order.Address = newOrder.Address.CustomAddress.Line;
                order.Location = newOrder.Address.CustomAddress.Location;
            }
            else
            {
                var me = await _db.Clients.FindAsync(userId);
                order.Address = me?.Address;
                order.Location = me?.Location;
            }

            _db.Orders.Add(order);
            try
            {
                var itemsAffected = await _db.SaveChangesAsync();
                if (itemsAffected == 0)
                {
                    return false;
                }

                var presents = newOrder.Presents.Select(p => new Present
                {
                    OrderId = order.Id,
                    Name = p.Name,
                    BuyBySanta = p.BuyBySanta
                });

                _db.Presents.AddRange(presents);
                await _db.SaveChangesAsync();

                return true;
            }
            catch (DbEntityValidationException)
            {
                return false;
            }
        }

        public async Task<PagedResponse<OrderShortInfo>> GetOrdersByClientId(string clientId, int count, int page)
        {
            var allOrdersForClient = _db.Orders
                .Where(o => o.ClientId == clientId);

            var orders = (await allOrdersForClient
                .OrderByDescending(o => o.Datetime)
                .Skip(page * count)
                .Take(count)
                .ToListAsync())
                .Select(o => new OrderShortInfo
                {
                    Id = o.Id,
                    Datetime = o.Datetime,
                    Address = o.Address,
                    ChildrenNames = o.ChildrenNames,
                    Status = o.Status,
                    SantaInfo = GetSantaInfo(o)
                });

            return new PagedResponse<OrderShortInfo>
            {
                Items = orders,
                TotalCount = await allOrdersForClient.CountAsync()
            };
        }

        public IEnumerable<OrderLocationInfo> GetAvailableOrderLocations()
        {
            return _db.Orders
                .Where(o => o.Status == OrderStatus.New)
                .Select(o => new OrderLocationInfo
            {
                Id = o.Id,
                Location = o.Location,
                Address = o.Address,
                Datetime = o.Datetime
            });
        }

        public async Task<OrderFullInfo> GetOrderFullInfo(int id)
        {
            var order = await _db.Orders.FindAsync(id);

            if (order != null)
            {
                return new OrderFullInfo
                {
                    Id = order.Id,
                    ClientName = order.Client.Name,
                    Address = order.Address,
                    ChildrenNames = order.ChildrenNames,
                    Datetime = order.Datetime,
                    Location = order.Location,
                    Presents = order.Presents.Select(p => new PresentInfo
                    {
                        Name = p.Name,
                        BuyBySanta = p.BuyBySanta
                    }),
                    Status = order.Status,
                    SantaInfo = GetSantaInfo(order)                      
                };
            }
            else
            {
                return null;
            }
        }

        public async Task<bool> ChangeOrder(OrderPostInfo model)
        {
            var order = await _db.Orders.FindAsync(model.Id);

            if(order != null)
            {
                order.Client.Name = model.ClientName;
                order.ChildrenNames = model.ChildrenNames;
                order.Datetime = model.Datetime;
                order.Address = model.Address;
                order.Status = model.Status;
                order.Presents = model.Presents;
            }

            try
            {
                var itemsAffected = await _db.SaveChangesAsync();
                if (itemsAffected == 0)
                {
                    return false;
                }

                await _db.SaveChangesAsync();

                return true;
            }
            catch (DbEntityValidationException)
            {
                return false;
            }
        }

        public async Task<bool> RateOrder(int id, float rating)
        {
            var order = await _db.Orders.FindAsync(id);
            if (order == null)
            {
                return false;
            }

            // Update santa's rating;
            var santa = order.Santa;
            santa.Rating = GetNewSantaRating(santa, rating, order.Rating ?? 0);

            order.Rating = rating;

            await _db.SaveChangesAsync();
            return true;
        }

        private Address GetOrderAddress(Order order)
        {
            if (order.UseProfileAddress)
            {
                return order.Client.Address;
            }
            else
            {
                return order.Address;
            }
        }

        private Location GetOrderLocation(Order order)
        {
            if (order.UseProfileAddress)
            {
                return order.Client.Location;
            }
            else
            {
                return order.Location;
            }
        }

        private SantaShortInfo GetSantaInfo(Order order)
        {
            if (order.Status == OrderStatus.New)
            {
                return new SantaShortInfo
                {
                    Id = "",
                    Name = "",
                    PhotoPath = ""
                };
            }

            return new SantaShortInfo
            {
                Id = order.Santa.Id,
                Name = order.Santa.Name,
                PhotoPath = order.Santa.PhotoPath
            };
        }

        

        private float GetNewSantaRating(Santa santa, float newRating, float oldRating = 0)
        {
            var numberOfOrders = santa.NumberOfOrders;
            var santaRating = santa.Rating ?? 0;
            return (numberOfOrders * santaRating - oldRating + newRating) / numberOfOrders;
        }
    }
}