using System;
using System.Collections.Generic;
using System.Linq;
using SantaFinder.Entities;
using SantaFinder.Web.Models.OrderHistory;

namespace SantaFinder.Web.Models.Shared
{
    public class OrderFullInfo
    {
        public OrderFullInfo() { }

        public OrderFullInfo(Order order)
        {
            Id = order.Id;
            ClientName = order.Client.Name;
            Address = order.Address;
            ChildrenNames = order.ChildrenNames;
            Datetime = order.Datetime;
            Location = order.Location;
            Presents = order.Presents.Select(p => new PresentInfo(p));
            Status = order.Status;
        }

        public int Id { get; set; }
        public string ClientName { get; set; }
        public string ChildrenNames { get; set; }
        public DateTime Datetime { get; set; }
        public bool UseProfileAddress { get; set; }
        public Address Address { get; set; }
        public Location Location { get; set; }
        public OrderStatus Status { get; set; }
        public virtual IEnumerable<PresentInfo> Presents { get; set; }
        public SantaShortInfo SantaInfo { get; set; }
    }
}