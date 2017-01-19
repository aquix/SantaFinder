﻿using System;
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
using SantaFinder.Web.Models.OrdersOnMap;

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
                Address = new Address(),
                Location = new Location(),
                Status = OrderStatus.New
            };

            if (!order.UseProfileAddress)
            {
                order.Address = newOrder.Address.CustomAddress.Line;
                order.Location = newOrder.Address.CustomAddress.Location;
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
            catch (DbEntityValidationException)
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
                ChildrenNames = o.ChildrenNames,
                Status = o.Status,
                SantaInfo = GetSantaInfo(o)
            });
        }

        public IEnumerable<OrderLocationInfo> GetOrderLocations()
        {
            return _db.Orders.ToList().Select(o => new OrderLocationInfo
            {
                Id = o.Id,
                Location = GetOrderLocation(o),
                Address = GetOrderAddress(o),
                Datetime = o.Datetime
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
                return null;
            }

            return new SantaShortInfo
            {
                Id = order.Santa.Id,
                Name = order.Santa.Name,
                PhotoPath = order.Santa.PhotoPath
            };
        }
    }
}