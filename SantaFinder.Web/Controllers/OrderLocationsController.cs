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
    public class OrderLocationsController : ApiController
    {
        private OrdersService _ordersService;

        public OrderLocationsController(OrdersService ordersService)
        {
            _ordersService = ordersService;
        }

        public IEnumerable<OrderLocationInfo> Get()
        {
            return new List<OrderLocationInfo>
            {
                new OrderLocationInfo
                {
                    Id = 1,
                    Location = new Location
                    {
                        Latitude = 10.47,
                        Longitude = -67.033
                    }
                },
                new OrderLocationInfo
                {
                    Id = 2,
                    Location = new Location
                    {
                        Latitude = 55.750074, 
                        Longitude = 37.599910
                    }
                }
            };
        }
    }
}
