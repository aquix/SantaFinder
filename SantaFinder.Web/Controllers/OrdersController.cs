using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Threading.Tasks;
using System.Web.Http;
using SantaFinder.Web.Models;

namespace SantaFinder.Web.Controllers
{
    [Authorize]
    public class OrdersController : ApiController
    {
        [HttpPost]
        public IHttpActionResult CreateOrder(NewOrder order)
        {
            return Ok();
        }
    }
}
