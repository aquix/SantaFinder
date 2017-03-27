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

        public NotificationsHub(AppDbContext dbContext)
        {
            Debug.Print("hub ctor");
            _dbContext = dbContext;
        }

        public override Task OnConnected()
        {
            Debug.Print($"User connected {Context.ConnectionId} {Context.User.Identity.GetUserId()}");
            Clients.All.Test(123);

            return base.OnConnected();
        }

        public override Task OnDisconnected(bool stopCalled)
        {
            Debug.Print($"User diconnected {Context.ConnectionId} {Context.User.Identity.GetUserId()}");

            return base.OnDisconnected(stopCalled);
        }
    }
}