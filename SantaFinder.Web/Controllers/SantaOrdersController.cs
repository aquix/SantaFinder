using System.Threading.Tasks;
using System.Web.Http;
using Microsoft.AspNet.Identity;
using SantaFinder.Web.Hubs;
using SantaFinder.Web.Models.SantaOrders;
using SantaFinder.Web.Models.Shared;
using SantaFinder.Web.Services;
using SantaFinder.Web.Models.ServerNotifications;

namespace SantaFinder.Web.Controllers
{
    [Authorize(Roles = "santa")]
    public class SantaOrdersController : ApiController
    {
        private SantaOrdersService _santaOrdersService;
        private NotificationsHubHelper _notificationsHub;

        public SantaOrdersController(
            SantaOrdersService ordersService,
            NotificationsHubHelper notificationsHub)
        {
            _santaOrdersService = ordersService;
            _notificationsHub = notificationsHub;
        }

        [HttpGet]
        public async Task<PagedResponse<SantaOrderPreview>> GetAll(SantaOrderStatusFilter filter, int count, int page = 0)
        {
            return await _santaOrdersService.GetAllOrders(User.Identity.GetUserId(), filter, count, page);
        }

        [HttpGet]
        public async Task<OrderFullInfo> GetDetails(int id)
        {
            return await _santaOrdersService.GetDetails(id);
        }

        [HttpPut]
        [Route("api/santaOrders/complete/{id}")]
        public async Task<bool> CompleteOrder(int id)
        {
            return await _santaOrdersService.CompleteOrder(User.Identity.GetUserId(), id);
        }

        [HttpPut]
        [Route("api/santaOrders/discard/{id}")]
        public async Task<bool> DiscardOrder(int id)
        {
            var result = await _santaOrdersService.DiscardOrder(id);
            var success = result.Item1;
            var order = result.Item2;

            if (success)
            {
                _notificationsHub.SendNotificationToUser(order.ClientId, new Notification
                {
                    Type = NotificationType.Error,
                    Content = $"Order #{order.Id} was rejected"
                });
            }

            return success;
        }

        [HttpPut]
        [Route("api/santaOrders/take/{id}")]
        public async Task<bool> TakeOrder(int id)
        {
            var userId = User.Identity.GetUserId();
            var result = await _santaOrdersService.TakeOrder(userId, id);
            var success = result.Item1;
            var order = result.Item2;

            if (success)
            {
                _notificationsHub.SendNotificationToUser(order.ClientId, new Notification
                {
                    Type = NotificationType.Success,
                    Content = $"Order #{order.Id} accepted by santa {order.Santa?.Name}"
                });
            }

            return success;
        }
    }
}
