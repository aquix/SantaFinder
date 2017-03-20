using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace SantaFinder.Web.Models.ServerNotifications
{
    public class Notification
    {
        public NotificationType Type { get; set; }
        public string Content { get; set; }
    }
}