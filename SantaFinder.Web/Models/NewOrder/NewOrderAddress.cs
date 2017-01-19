using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using SantaFinder.Data.Entities;
using SantaFinder.Web.Models.Shared;

namespace SantaFinder.Web.Models
{
    public class NewOrderAddress
    {
        public bool UseDefaultAddress { get; set; }
        public AddressWithLocation CustomAddress { get; set; }
    }
}