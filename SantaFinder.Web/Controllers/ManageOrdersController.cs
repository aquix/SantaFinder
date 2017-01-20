using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using System.Web;
using System.Web.Http;
using Microsoft.AspNet.Identity;
using SantaFinder.Data.Entities;
using SantaFinder.Web.Areas.Auth.Managers;
using SantaFinder.Web.Services;

namespace SantaFinder.Web.Controllers
{
    [Authorize]
    public class ManageOrdersController : ApiController
    {
        private OrdersService _ordersService;
        private AppUserManager<Santa> _santaManager;

        public ManageOrdersController(OrdersService ordersService, AppUserManager<Santa> santaManager)
        {
            _ordersService = ordersService;
            _santaManager = santaManager;
        }

        [HttpPost]
        public async Task<bool> TakeOrder(int id)
        {
            var userId = User.Identity.GetUserId();

            // TODO create service for checking type or integrate roles
            var santa = await _santaManager.FindByIdAsync(userId);
            return await _ordersService.TakeOrder(userId, id);
        }
    }
}