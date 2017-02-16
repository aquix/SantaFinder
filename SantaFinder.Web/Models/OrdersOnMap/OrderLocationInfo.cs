using System;
using SantaFinder.Entities;

namespace SantaFinder.Web.Models.OrdersOnMap
{
    public class OrderLocationInfo
    {
        public int Id { get; set; }
        public Location Location { get; set; }
        public Address Address { get; set; }
        public DateTime Datetime { get; set; }
    }
}