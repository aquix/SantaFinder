using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace SantaFinder.Web.Models.Santas
{
    public class SantaFullInfoForClient
    {
        public string Name { get; set; }
        public string PhotoUrl { get; set; }
        public float Rating { get; set; }
        public int NumberOfOrders { get; set; }

        public IEnumerable<FeedbackItem> Feedbacks { get; set; }
    }
}