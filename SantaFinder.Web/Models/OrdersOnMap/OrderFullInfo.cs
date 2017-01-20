using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using SantaFinder.Data.Entities;
using SantaFinder.Web.Models.Shared;

namespace SantaFinder.Web.Models.OrdersOnMap
{
    public class OrderFullInfo
    {
        public int Id { get; set; }
        public string ClientName { get; set; }
        public string ChildrenNames { get; set; }
        public DateTime Datetime { get; set; }
        public bool UseProfileAddress { get; set; }
        public Address Address { get; set; }
        public Location Location { get; set; }
        public OrderStatus Status { get; set; }
        public virtual IEnumerable<PresentInfo> Presents { get; set; }
    }
}