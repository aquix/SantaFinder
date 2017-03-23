using Microsoft.AspNet.SignalR;
using SantaFinder.Web.Models.ServerNotifications;
using System;
using System.Collections.Generic;
using System.Diagnostics;
using System.Linq;
using System.Web;

namespace SantaFinder.Web.Hubs
{
    public class NotificationsHubHelper
    {
        private IHubContext _hubContext;

        public NotificationsHubHelper(IHubContext hubContext)
        {
            Debug.Print("hub helper ctor");
            _hubContext = hubContext;
        }

        public void SendNotificationToUser(string userId, Notification notification)
        {
            _hubContext.Clients.User(userId).Notify(notification);
        }
    }
}