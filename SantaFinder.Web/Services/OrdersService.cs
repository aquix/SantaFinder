using System;
using System.Collections.Generic;
using System.Data.Entity;
using System.Data.Entity.Validation;
using System.Diagnostics;
using System.Linq;
using System.Threading.Tasks;
using System.Web;
using SantaFinder.Data.Context;
using SantaFinder.Data.Entities;
using SantaFinder.Web.Models;
using SantaFinder.Web.Models.OrderHistory;

namespace SantaFinder.Web.Services
{
    public class OrdersService
    {
        private IDbContext _db;

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
                Address = new Address()
            };

            if (!order.UseProfileAddress)
            {
                order.Address = newOrder.Address.CustomAddress;
            };

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
            catch (DbEntityValidationException e)
            {
                return false;
            }
        }

        public IEnumerable<OrderShortInfo> GetOrdersByClientId(string clientId)
        {
            var orders = _db.Orders.Where(o => o.ClientId == clientId);

            var orderList = orders.ToList();
            return orders.ToList().Select(o => new OrderShortInfo
            {
                Id = o.Id,
                Datetime = o.Datetime,
                Address = GetOrderAddress(o),
                SantaInfo = new SantaShortInfo
                {
                    Id = "123",
                    Name = "Test santa",
                    PhotoPath = "test.png"
                }
            });
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
    }
}