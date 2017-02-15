using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Threading.Tasks;
using System.Web.Http;
using SantaFinder.Web.Models.Shared;
using SantaFinder.Web.Services;

namespace SantaFinder.Web.Controllers
{
    [Authorize]
    public class OrdersController : ApiController
    {
        private OrdersService _ordersService;

        public OrdersController(OrdersService ordersService)
        {
            _ordersService = ordersService;
        }

        public async Task<OrderFullInfo> Get(int id)
        {
            var serverUrl = Request.RequestUri.GetLeftPart(UriPartial.Authority);
            return await _ordersService.GetOrderFullInfo(id, serverUrl);
        }
    }
}
