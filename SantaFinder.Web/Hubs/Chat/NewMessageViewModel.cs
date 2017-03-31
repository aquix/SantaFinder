using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace SantaFinder.Web.Hubs.Chat
{
    public class NewMessageViewModel
    {
        public int OrderId { get; set; }
        public string Body { get; set; }
    }
}