using System;
using System.Collections.Generic;
using System.Linq;
using SantaFinder.Entities;
using SantaFinder.Web.Models.OrderHistory;

namespace SantaFinder.Web.Models.ChangeOrder
{
    public class OrderPostInfo
    {
        public int Id { get; set; }
        public string ClientName { get; set; }
        public string ChildrenNames { get; set; }
        public DateTime Datetime { get; set; }
        public bool UseProfileAddress { get; set; }
        public NewOrderAddress Address { get; set; }
        public IEnumerable<Present> Presents { get; set; }
    }
}