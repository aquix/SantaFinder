using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Threading.Tasks;
using System.Web.Http;
using Microsoft.AspNet.Identity;
using SantaFinder.Entities;
using SantaFinder.Web.Models;
using SantaFinder.Web.Models.ChangeOrder;
using SantaFinder.Web.Models.OrderHistory;
using SantaFinder.Web.Models.Shared;
using SantaFinder.Web.Services;

namespace SantaFinder.Web.Controllers
{
    [Authorize(Roles = "client")]
    [RoutePrefix("api/clientOrders")]
    public class ClientOrdersController : ApiController
    {
        private OrdersService _ordersService;

        public ClientOrdersController(OrdersService ordersService)
        {
            _ordersService = ordersService;
        }

        [HttpGet]
        public async Task<PagedResponse<OrderShortInfo>> GetMyOrders(int count, int page = 0)
        {
            var serverUrl = Request.RequestUri.GetLeftPart(UriPartial.Authority);
            return await _ordersService.GetOrdersByClientId(User.Identity.GetUserId(), count, page, serverUrl);
        }

        [HttpGet]
        public async Task<OrderFullInfoForEditing> Get(int id)
        {
            // TODO move it to service
            var serverUrl = Request.RequestUri.GetLeftPart(UriPartial.Authority);
            var order = await _ordersService.GetOrder(id);
            var orderViewModel = new OrderFullInfoForEditing
            {
                Id = order.Id,
                Address = order.Address,
                ChildrenNames = order.ChildrenNames,
                Datetime = order.Datetime,
                Location = order.Location,
                Presents = order.Presents.Select(p => new PresentInfoForEdit
                {
                    Id = p.Id,
                    BuyBySanta = p.BuyBySanta,
                    Name = p.Name
                }),
                
                Status = order.Status,
                Rating = order.Rating
            };

            if (orderViewModel.Status != OrderStatus.New)
            {
                orderViewModel.SantaInfo = new Models.Santas.SantaInfoForClient
                {
                    Id = order.Santa.Id,
                    Name = order.Santa.Name,
                    NumberOfOrders = order.Santa.NumberOfOrders,
                    PhotoUrl = serverUrl + "/static/santaPhotos/" + order.Santa.Id,
                    Rating = order.Santa.Rating
                };
            }

            return orderViewModel;
        }

        [HttpPost]
        public async Task<IHttpActionResult> CreateOrder(NewOrder order)
        {
            var newOrderId = await _ordersService.CreateOrder(order, User.Identity.GetUserId());
            if (newOrderId == -1)
            {
                return InternalServerError();
            }

            return Json(newOrderId);
        }

        [HttpPut]
        [Route("{orderId}/rate")]
        public async Task<bool> RateOrder(int orderId, int rating)
        {
            return await _ordersService.RateOrder(orderId, rating);
        }

        [HttpPut]
        [Route("{orderId}/change")]
        public async Task<IHttpActionResult> ChangeOrder(int orderId, OrderPostInfo model)
        {
            var success = await _ordersService.ChangeOrder(orderId, model);
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
