using Microsoft.AspNet.Identity;
using Microsoft.AspNet.SignalR;
using SantaFinder.Data.Context;
using SantaFinder.Entities;
using SantaFinder.Web.Models.Shared;
using System;
using System.Collections.Generic;
using System.Diagnostics;
using System.Linq;
using System.Threading.Tasks;
using System.Web;

namespace SantaFinder.Web.Hubs.Chat
{
    public class ChatHub : Hub<IChatHub>
    {
        private AppDbContext _db;

        public ChatHub(AppDbContext dbContext)
        {
            Debug.Print("hub ctor");
            _db = dbContext;
        }

        public override Task OnConnected()
        {
            Debug.Print($"ChatHub connected {Context.User.Identity.GetUserName()}");
            return base.OnConnected();
        }

        public override Task OnDisconnected(bool stopCalled)
        {
            Debug.Print($"ChatHub disconnected {Context.User.Identity.GetUserName()}");
            return base.OnDisconnected(stopCalled);
        }

        public override Task OnReconnected()
        {
            Debug.Print($"ChatHub reconnected {Context.User.Identity.GetUserName()}");
            return base.OnReconnected();
        }

        public async Task SendMessage(NewMessageViewModel newMessageViewModel)
        {
            var order = await _db.Orders.FindAsync(newMessageViewModel.OrderId);

            if (order == null) return;

            var newMessage = new ChatMessage
            {
                OrderId = order.Id,
                Body = newMessageViewModel.Body,
                Datetime = DateTime.Now,
                SenderId = Context.User.Identity.GetUserId()
            };

            _db.ChatMessages.Add(newMessage);
            var itemsAffected = await _db.SaveChangesAsync();

            if (itemsAffected == 0) return;

            var usersInChat = new List<string> { order.ClientId };
            if (order.SantaId != null)
            {
                usersInChat.Add(order.SantaId);
            }

            Clients.Users(usersInChat)
                .OnMessageReceived(new ChatMessageViewModel
                {
                    Body = newMessage.Body,
                    Datetime = newMessage.Datetime,
                    SenderId = newMessage.SenderId
                });
        }
    }
}