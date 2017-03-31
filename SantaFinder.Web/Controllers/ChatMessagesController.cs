using SantaFinder.Data.Context;
using SantaFinder.Web.Models.Shared;
using System;
using System.Collections.Generic;
using System.Data.Entity;
using System.Linq;
using System.Threading.Tasks;
using System.Web;
using System.Web.Http;

namespace SantaFinder.Web.Controllers
{
    [Authorize]
    [RoutePrefix("api/chatmessages")]
    public class ChatMessagesController : ApiController
    {
        private IDbContext _db;

        public ChatMessagesController(IDbContext db)
        {
            _db = db;
        }

        [HttpGet]
        [Route("{orderId:int}")]
        public async Task<IEnumerable<ChatMessageViewModel>> GetMessagesFromOrder(int orderId, int startIndex, int count=20)
        {
            var messages = _db.ChatMessages
                .Where(m => m.OrderId == orderId)
                .OrderByDescending(m => m.Datetime).ToList();
            var messagesVMs = messages
                .Select(m => new ChatMessageViewModel
                {
                    Body = m.Body,
                    Datetime = m.Datetime,
                    SenderId = m.SenderId
                });
            var result = messagesVMs
                .Skip(startIndex)
                .Take(count)
                .Reverse();

            return result;
        }
    }
}