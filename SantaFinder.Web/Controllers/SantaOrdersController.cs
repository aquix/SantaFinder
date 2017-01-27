using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Threading.Tasks;
using System.Web.Http;
using Microsoft.AspNet.Identity;
using SantaFinder.Web.Models.OrdersOnMap;
using SantaFinder.Web.Models.SantaOrders;
using SantaFinder.Web.Models.Shared;
using SantaFinder.Web.Services;

namespace SantaFinder.Web.Controllers
{
    //[RoutePrefix("api/santaOrders")]
    [Authorize]
    public class SantaOrdersController : ApiController
    {
        private SantaOrdersService _santaOrdersService;

        public SantaOrdersController(SantaOrdersService ordersService)
        {
            _santaOrdersService = ordersService;
        }

        [HttpGet]
        public IEnumerable<SantaOrderPreview> GetAll()
        {
            return _santaOrdersService.GetAllOrders(User.Identity.GetUserId());
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
            return await _santaOrdersService.DiscardOrder(id);
        }
    }
}
