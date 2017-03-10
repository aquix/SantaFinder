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

namespace SantaFinder.Web.Areas.Admin.Controllers
{
    public class ClientsController : ApiController
    {
        private AppDbContext _db;

        public ClientsController(AppDbContext db)
        {
            _db = db;
        }

        // GET: api/Clients
        public IQueryable<Client> GetUsers()
        {
            return _db.Clients;
        }

        // GET: api/Clients/5
        [ResponseType(typeof(Client))]
        public IHttpActionResult GetClient(string id)
        {
            Client client = _db.Clients.Find(id);
            if (client == null)
            {
                return NotFound();
            }

            return Ok(client);
        }

        // PUT: api/Clients/5
        [ResponseType(typeof(void))]
        public IHttpActionResult PutClient(string id, Client client)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            if (id != client.Id)
            {
                return BadRequest();
            }

            _db.Entry(client).State = EntityState.Modified;

            try
            {
                _db.SaveChanges();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!ClientExists(id))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            return StatusCode(HttpStatusCode.NoContent);
        }

        // POST: api/Clients
        [ResponseType(typeof(Client))]
        public IHttpActionResult PostClient(Client client)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            _db.Users.Add(client);

            try
            {
                _db.SaveChanges();
            }
            catch (DbUpdateException)
            {
                if (ClientExists(client.Id))
                {
                    return Conflict();
                }
                else
                {
                    throw;
                }
            }

            return CreatedAtRoute("DefaultApi", new { id = client.Id }, client);
        }

        // DELETE: api/Clients/5
        [ResponseType(typeof(Client))]
        public IHttpActionResult DeleteClient(string id)
        {
            Client client = _db.Clients.Find(id);
            if (client == null)
            {
                return NotFound();
            }

            _db.Users.Remove(client);
            _db.SaveChanges();

            return Ok(client);
        }

        protected override void Dispose(bool disposing)
        {
            if (disposing)
            {
                _db.Dispose();
            }
            base.Dispose(disposing);
        }

        private bool ClientExists(string id)
        {
            return _db.Users.Count(e => e.Id == id) > 0;
        }
    }
}