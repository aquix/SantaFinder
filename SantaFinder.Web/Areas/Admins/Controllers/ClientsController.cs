using System;
using System.Collections.Generic;
using System.Data;
using System.Data.Entity;
using System.Data.Entity.Infrastructure;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using System.Web.Http.Description;
using SantaFinder.Data.Context;
using SantaFinder.Entities;
using System.Threading.Tasks;
using SantaFinder.Web.Models.Shared;
using SantaFinder.Web.Models.UsersList;
using Microsoft.AspNet.Identity;
using SantaFinder.Web.Areas.Admins.Service;

namespace SantaFinder.Web.Areas.Admins.Controllers
{
    [Authorize(Roles = "admin")]
    [RoutePrefix("api/admin")]
    public class ClientsController : ApiController
    {
        private ClientService _clientService;

        public ClientsController(ClientService clientService)
        {
            _clientService = clientService;
        }


        [HttpGet]
        [Route("clientlist")]
        public async Task<PagedResponse<ClientInfo>> GetClientsList(int count, int page = 0)
        {
            var serverUrl = Request.RequestUri.GetLeftPart(UriPartial.Authority);
            return await _clientService.GetClientList(User.Identity.GetUserId(), count, page, serverUrl);
        }
    }
}