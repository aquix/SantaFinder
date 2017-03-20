using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using SantaFinder.Web.Models.ServerNotifications;

namespace SantaFinder.Web.Hubs
{
    public interface INotificationsHub
    {
        void Notify(Notification notification);
    }
}
