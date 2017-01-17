using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using SantaFinder.Data.Entities;

namespace SantaFinder.Web.Models
{
    public class NewOrder
    {
        public NewOrderAddress Address { get; set; }
        public string ChildrenNames { get; set; }
        public List<NewPresent> Presents { get; set; }
        public DateTime Datetime { get; set; }
    }
}