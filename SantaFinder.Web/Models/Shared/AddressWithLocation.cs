using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using SantaFinder.Data.Entities;

namespace SantaFinder.Web.Models.Shared
{
    public class AddressWithLocation
    {
        public Address Line { get; set; }
        public Location Location { get; set; }
    }
}