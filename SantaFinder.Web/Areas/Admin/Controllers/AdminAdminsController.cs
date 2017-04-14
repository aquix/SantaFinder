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

namespace SantaFinder.Web.Areas.Admin.Controllers
{
    [RoutePrefix("api/admin/admins")]
    public class AdminAdminsController : ApiController
    {
        private AppDbContext db = new AppDbContext();

        // GET: api/Admins
        [Route("")]
        public IQueryable<Entities.Admin> GetAdmins()
        {
            return db.Admins;
        }

        // GET: api/Admins/5
        [Route("{id}")]
        [ResponseType(typeof(Entities.Admin))]
        public async Task<IHttpActionResult> GetAdmin(string id)
        {
            Entities.Admin admin = await db.Admins.FindAsync(id);
            if (admin == null)
            {
                return NotFound();
            }

            return Ok(admin);
        }

        // PUT: api/Admins/5
        [Route("{id}")]
        [ResponseType(typeof(void))]
        public async Task<IHttpActionResult> PutAdmin(string id, Entities.Admin admin)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            if (id != admin.Id)
            {
                return BadRequest();
            }

            db.Entry(admin).State = EntityState.Modified;

            try
            {
                await db.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!AdminExists(id))
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

        // POST: api/Admins
        [Route("")]
        [ResponseType(typeof(Entities.Admin))]
        public async Task<IHttpActionResult> PostAdmin(Entities.Admin admin)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            db.Admins.Add(admin);

            try
            {
                await db.SaveChangesAsync();
            }
            catch (DbUpdateException)
            {
                if (AdminExists(admin.Id))
                {
                    return Conflict();
                }
                else
                {
                    throw;
                }
            }

            return CreatedAtRoute("DefaultApi", new { id = admin.Id }, admin);
        }

        // DELETE: api/Admins/5
        [Route("{id}")]
        [ResponseType(typeof(Entities.Admin))]
        public async Task<IHttpActionResult> DeleteAdmin(string id)
        {
            Entities.Admin admin = await db.Admins.FindAsync(id);
            if (admin == null)
            {
                return NotFound();
            }

            db.Admins.Remove(admin);
            await db.SaveChangesAsync();

            return Ok(admin);
        }

        protected override void Dispose(bool disposing)
        {
            if (disposing)
            {
                db.Dispose();
            }
            base.Dispose(disposing);
        }

        private bool AdminExists(string id)
        {
            return db.Admins.Count(e => e.Id == id) > 0;
        }
    }
}