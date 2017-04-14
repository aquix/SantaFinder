using System;
using System.Collections.Generic;
using System.Data;
using System.Data.Entity;
using System.Data.Entity.Infrastructure;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Threading.Tasks;
using System.Web.Http;
using System.Web.Http.Description;
using SantaFinder.Data.Context;
using SantaFinder.Entities;
using SantaFinder.Web.Models.Shared;
using SantaFinder.Web.Areas.Admin.Models.Clients;
using SantaFinder.Data.Identity;

namespace SantaFinder.Web.Areas.Admin.Controllers
{
    [RoutePrefix("api/admin/clients")]
    public class AdminClientsController : ApiController
    {
        private AppDbContext db = new AppDbContext();

        private AppUserManager<Client> _clientManager;

        public AdminClientsController(AppUserManager<Client> clientManager)
        {
            _clientManager = clientManager;
        }

        // GET: api/Clients
        [Route("")]
        public async Task<PagedResponse<ClientPreview>> GetClients(int startIndex = 0, int count = 0)
        {
            var clients = await db.Clients
                .OrderBy(c => c.Name)
                .Skip(startIndex)
                .Take(count)
                .Select(c => new ClientPreview
                {
                    Id = c.Id,
                    Email = c.Email,
                    Name = c.Name
                })
                .ToListAsync();

            return new PagedResponse<ClientPreview>
            {
                Items = clients,
                TotalCount = await db.Clients.CountAsync()
            };
        }

        // GET: api/Clients/5
        [Route("{id}")]
        [ResponseType(typeof(ClientModel))]
        public async Task<IHttpActionResult> GetClient(string id)
        {
            var client = await db.Clients.FindAsync(id);
            if (client == null)
            {
                return NotFound();
            }

            return Ok(new ClientModel
            {
                Id = client.Id,
                Name = client.Name,
                Address = client.Address,
                Location = client.Location,
                Email = client.Email,
                NewPassword = new Models.Shared.NewPassword()
            });
        }

        // PUT: api/Clients/5
        [Route("{id}")]
        [ResponseType(typeof(void))]
        public async Task<IHttpActionResult> PutClient(string id, ClientModel clientModel)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            if (id != clientModel.Id)
            {
                return BadRequest();
            }

            if (!string.IsNullOrEmpty(clientModel.NewPassword.Password) &&
                clientModel.NewPassword.Password != clientModel.NewPassword.Confirmation)
            {
                return BadRequest();
            }

            var client = await _clientManager.FindByIdAsync(id);

            client.Name = clientModel.Name;
            client.Email = clientModel.Email;
            client.Address = clientModel.Address;
            client.Location = clientModel.Location;
            client.PasswordHash = _clientManager.PasswordHasher.HashPassword(clientModel.NewPassword.Password);

            await _clientManager.UpdateAsync(client);

            return StatusCode(HttpStatusCode.NoContent);
        }

        // POST: api/Clients
        [Route("")]
        public async Task<IHttpActionResult> PostClient(ClientModel clientModel)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            if (string.IsNullOrEmpty(clientModel.NewPassword.Password))
            {
                return BadRequest("Client must have a password");
            }

            if (clientModel.NewPassword.Password != clientModel.NewPassword.Confirmation)
            {
                return BadRequest("Password must be the same");
            }

            var client = new Client
            {
                Name = clientModel.Name,
                Email = clientModel.Email,
                Address = clientModel.Address,
                Location = clientModel.Location
            };

            await _clientManager.CreateAsync(client, clientModel.NewPassword.Password);

            return Ok(client.Id);
        }

        // DELETE: api/Clients/5
        [Route("{id}")]
        [ResponseType(typeof(Client))]
        public async Task<IHttpActionResult> DeleteClient(string id)
        {
            var client = await _clientManager.FindByIdAsync(id);

            if (client != null)
            {
                await _clientManager.DeleteAsync(client);
                return Ok(client);
            }
            else
            {
                return NotFound();
            }
        }

        protected override void Dispose(bool disposing)
        {
            if (disposing)
            {
                db.Dispose();
            }
            base.Dispose(disposing);
        }

        private bool ClientExists(string id)
        {
            return db.Clients.Count(e => e.Id == id) > 0;
        }
    }
}