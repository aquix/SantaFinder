using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using SantaFinder.Data.Entities;

namespace SantaFinder.Web.Models
{
    public class NewOrderAddress
    {
        public bool UseDefaultAddress { get; set; }
        public Address CustomAddress { get; set; }
    }
}