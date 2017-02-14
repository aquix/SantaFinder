using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace SantaFinder.Web.Models.ChangeOrder
{
    public class PresentInfoForEdit
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public bool BuyBySanta { get; set; }
    }
}