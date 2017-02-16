using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace SantaFinder.Web.Models.Santas
{
    public class FeedbackItem
    {
        public string ClientName { get; set; }
        public float Rating { get; set; }
        public DateTime Datetime { get; set; }
    }
}