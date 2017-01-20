using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using SantaFinder.Data.Entities;

namespace SantaFinder.Web.Models.Shared
{
    public class PresentInfo
    {
        public PresentInfo() { }

        public PresentInfo(Present present)
        {
            Name = present.Name;
            BuyBySanta = present.BuyBySanta;
        }

        public string Name { get; set; }
        public bool BuyBySanta { get; set; }
    }
}