using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using SantaFinder.Entities;
using SantaFinder.Web.Models.OrderHistory;
using SantaFinder.Web.Models.Santas;
using SantaFinder.Web.Models.Shared;

namespace SantaFinder.Web.Models.ChangeOrder
{
    public class OrderFullInfoForEditing
    {
        public int Id { get; set; }
        public string ChildrenNames { get; set; }
        public DateTime Datetime { get; set; }
        public Address Address { get; set; }
        public Location Location { get; set; }
        public OrderStatus Status { get; set; }
        public IEnumerable<PresentInfoForEdit> Presents { get; set; }
        public SantaInfoForClient SantaInfo { get; set; }
        public int? Rating { get; set; }
    }
}