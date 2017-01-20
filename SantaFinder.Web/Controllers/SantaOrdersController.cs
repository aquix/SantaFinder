using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using SantaFinder.Web.Models.OrdersOnMap;
using SantaFinder.Web.Models.Shared;
using SantaFinder.Web.Services;

namespace SantaFinder.Web.Controllers
{
    [Authorize]
    public class SantaOrdersController : ApiController
    {
        private SantaOrdersService _ordersService;

        public SantaOrdersController(SantaOrdersService ordersService)
        {
            _ordersService = ordersService;
        }

        public IEnumerable<OrderFullInfo> GetAll(string id)
        {
            return _ordersService.GetAllOrders(id);
        }
    }
}
