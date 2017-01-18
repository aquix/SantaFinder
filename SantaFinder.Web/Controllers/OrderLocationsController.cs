using System.Collections.Generic;
using System.Web.Http;
using SantaFinder.Data.Entities;
using SantaFinder.Web.Models.OrdersOnMap;
using SantaFinder.Web.Services;

namespace SantaFinder.Web.Controllers
{
    [Authorize]
    public class OrderLocationsController : ApiController
    {
        private OrdersService _ordersService;

        public OrderLocationsController(OrdersService ordersService)
        {
            _ordersService = ordersService;
        }

        public IEnumerable<OrderLocationInfo> Get()
        {
            return _ordersService.GetOrderLocations();
        }
    }
}
