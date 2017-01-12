using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace SantaFinder.Data.Entities
{
    public class Address
    {
        public string City { get; set; }
        public string Street { get; set; }
        public string House { get; set; }
        public string Apartment { get; set; }
    }
}