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

namespace SantaFinder.Web.Hubs
{
    public class NotificationsHub : Hub<INotificationsHub>
    {
        private AppDbContext _dbContext;

        private readonly Dictionary<string, string> _clients = new Dictionary<string, string>();
        private readonly Dictionary<string, string> _santas = new Dictionary<string, string>();

        public NotificationsHub(AppDbContext dbContext)
        {
            _dbContext = dbContext;
        }

        public override Task OnConnected()
        {
            IDictionary<string, string> collectionToAdd = null;

            if (Context.User.IsInRole("client"))
            {
                collectionToAdd = _clients;
            }
            else if (Context.User.IsInRole("santa"))
            {
                collectionToAdd = _santas;
            }

            if (collectionToAdd != null && !collectionToAdd.ContainsKey(Context.ConnectionId))
            {
                collectionToAdd?.Add(Context.ConnectionId, Context.User.Identity.GetUserId());
            }

            Debug.Print($"User connected {Context.ConnectionId} {Context.User.Identity.GetUserId()}");

            return base.OnConnected();
        }

        public override Task OnDisconnected(bool stopCalled)
        {
            _clients.Remove(Context.ConnectionId);
            _santas.Remove(Context.ConnectionId);

            Debug.Print($"User diconnected {Context.ConnectionId} {Context.User.Identity.GetUserId()}");

            return base.OnDisconnected(stopCalled);
        }

        public static void SendNotificationToUser(string userId, Notification notification)
        {
            var hubContext = GlobalHost.ConnectionManager.GetHubContext<NotificationsHub>();
            hubContext.Clients.User(userId).Notify(notification);
        }
    }
}