using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace SantaFinder.Web.Models.Shared
{
    public class ChatMessageViewModel
    {
        public string Body { get; set; }
        public DateTime Datetime { get; set; }
        public string SenderId { get; set; }
    }
}