using SantaFinder.Web.Models.Shared;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace SantaFinder.Web.Hubs.Chat
{
    public interface IChatHub
    {
        void OnMessageReceived(ChatMessageViewModel chatMessage);
    }
}
