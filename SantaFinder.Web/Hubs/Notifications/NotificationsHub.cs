using System;
using System.Collections.Generic;
using System.Data.Entity;
using System.Diagnostics;
using System.Linq;
using System.Security.Principal;
using System.Threading.Tasks;
using System.Web;
using System.Web.Http;
using Microsoft.AspNet.Identity;
using Microsoft.AspNet.SignalR;
using SantaFinder.Data.Context;
using SantaFinder.Web.Models.ServerNotifications;
using Microsoft.AspNet.SignalR.Infrastructure;
using Autofac.Integration.SignalR;
using Autofac.Features.AttributeFilters;

namespace SantaFinder.Web.Notifications.Hubs
{
    public class NotificationsHub : Hub<INotificationsHub>
    {
        private AppDbContext _dbContext;

        public override Task OnConnected()
        {
            Debug.Print($"NotificationsHub connected {Context.User.Identity.GetUserName()}");
            return base.OnConnected();
        }

        public override Task OnDisconnected(bool stopCalled)
        {
            Debug.Print($"NotificationsHub disconnected {Context.User.Identity.GetUserName()}");
            return base.OnDisconnected(stopCalled);
        }

        public override Task OnReconnected()
        {
            Debug.Print($"NotificationsHub reconnected {Context.User.Identity.GetUserName()}");
            return base.OnReconnected();
        }
    }
}