using System;
using System.Collections.Generic;
using System.Linq;
using SantaFinder.Entities;
using SantaFinder.Web.Models.OrderHistory;

namespace SantaFinder.Web.Models.Shared
{
    public class OrderPostInfo
    {

        public int Id { get; set; }
        public string ClientName { get; set; }
        public string ChildrenNames { get; set; }
        public DateTime Datetime { get; set; }
        public bool UseProfileAddress { get; set; }
        public Address Address { get; set; }
        public Location Location { get; set; }
        public OrderStatus Status { get; set; }
        public virtual ICollection<Present> Presents { get; set; }
        public SantaShortInfo SantaInfo { get; set; }
    }
}