﻿using System.Threading.Tasks;
using System.Web.Http;
using Microsoft.AspNet.Identity;
using SantaFinder.Web.Models;
using SantaFinder.Web.Models.OrderHistory;
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

        [HttpPost]
        public async Task<IHttpActionResult> CreateOrder(NewOrder order)
        {
            var success = await _ordersService.CreateOrder(order, User.Identity.GetUserId());
            if (success)
            {
                return Ok();
            }
            else
            {
                return InternalServerError();
            }
        }

        [HttpGet]
        public async Task<PagedResponse<OrderShortInfo>> GetMyOrders(int count, int page = 0)
        {
            return await _ordersService.GetOrdersByClientId(User.Identity.GetUserId(), count, page);
        }
        
        [HttpGet]
        public async Task<OrderFullInfo> GetOrderFullInfo(int id)
        {
            return await _ordersService.GetOrderFullInfo(id);
        }
    }
}
