using System;
using System.Threading.Tasks;
using System.Web.Http;
using Microsoft.AspNet.Identity;
using SantaFinder.Web.Models;
using SantaFinder.Web.Models.OrderHistory;
using SantaFinder.Web.Models.Shared;
using SantaFinder.Web.Services;

namespace SantaFinder.Web.Controllers
{
    [Authorize]
    [RoutePrefix("api/orders/client")]
    public class OrdersController : ApiController
    {
        private OrdersService _ordersService;

        public OrdersController(OrdersService ordersService)
        {
            _ordersService = ordersService;
        }

        [HttpGet]
        public async Task<OrderFullInfo> GetOrderFullInfo(int id)
        {
            return await _ordersService.GetOrderFullInfo(id);
        }

        [HttpPost]
        [Route("order")]
        public async Task<IHttpActionResult> ChangeOrder(OrderPostInfo model)
        {
            var success =  await _ordersService.ChangeOrder(model);
            if (success)
            {
                return Ok();
            }
            else
            {
                return InternalServerError();
            }
        }
    }
}
