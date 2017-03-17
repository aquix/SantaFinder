﻿using System.Threading.Tasks;
using System.Web.Http;
using Microsoft.AspNet.Identity;
using SantaFinder.Web.Models.SantaOrders;
using SantaFinder.Web.Models.Shared;
using SantaFinder.Web.Services;

namespace SantaFinder.Web.Controllers
{
    [Authorize(Roles = "santa")]
    public class SantaOrdersController : ApiController
    {
        private SantaOrdersService _santaOrdersService;

        public SantaOrdersController(SantaOrdersService ordersService)
        {
            _santaOrdersService = ordersService;
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
            return await _santaOrdersService.DiscardOrder(id);
        }

        [HttpPut]
        [Route("api/santaOrders/take/{id}")]
        public async Task<bool> TakeOrder(int id)
        {
            var userId = User.Identity.GetUserId();
            return await _santaOrdersService.TakeOrder(userId, id);
        }
    }
}