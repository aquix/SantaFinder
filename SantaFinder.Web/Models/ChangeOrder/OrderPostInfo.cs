using System;
using System.Collections.Generic;
using System.Linq;
using SantaFinder.Entities;
using SantaFinder.Web.Models.OrderHistory;
using SantaFinder.Web.Models.Shared;

namespace SantaFinder.Web.Models.ChangeOrder
{
    public class OrderPostInfo
    {
        public string ChildrenNames { get; set; }
        public DateTime Datetime { get; set; }
        public AddressWithLocation Address { get; set; }
        public IEnumerable<PresentInfoForEdit> Presents { get; set; }
    }
}