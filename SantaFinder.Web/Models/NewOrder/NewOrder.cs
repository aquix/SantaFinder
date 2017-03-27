﻿using System;
using System.Collections.Generic;
using SantaFinder.Web.Models.Shared;

namespace SantaFinder.Web.Models
{
    public class NewOrder
    {
        public NewOrderAddress Address { get; set; }
        public string ChildrenNames { get; set; }
        public List<PresentInfo> Presents { get; set; }
        public DateTime Datetime { get; set; }
        public string Comments { get; set; }
    }
}