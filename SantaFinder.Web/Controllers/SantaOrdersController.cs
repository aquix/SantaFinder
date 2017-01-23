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
    }
}
