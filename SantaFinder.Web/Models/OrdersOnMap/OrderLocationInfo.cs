using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using SantaFinder.Web.Models.Shared;

namespace SantaFinder.Web.Models.OrdersOnMap
{
    public class OrderLocationInfo
    {
        public int Id { get; set; }
        public Location Location { get; set; }
    }
}