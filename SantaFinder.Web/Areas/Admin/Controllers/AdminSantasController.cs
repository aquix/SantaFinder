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
    [RoutePrefix("admin/api/santas")]
    public class AdminSantasController : ApiController
    {
        private AppDbContext db = new AppDbContext();

        // GET: api/Santas
        [Route("")]
        public IQueryable<Santa> GetSantas()
        {
            return db.Santas;
        }

        // GET: api/Santas/5
        [Route("{id}")]
        [ResponseType(typeof(Santa))]
        public async Task<IHttpActionResult> GetSanta(string id)
        {
            Santa santa = await db.Santas.FindAsync(id);
            if (santa == null)
            {
                return NotFound();
            }

            return Ok(santa);
        }

        // PUT: api/Santas/5
        [Route("{id}")]
        [ResponseType(typeof(void))]
        public async Task<IHttpActionResult> PutSanta(string id, Santa santa)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            if (id != santa.Id)
            {
                return BadRequest();
            }

            db.Entry(santa).State = EntityState.Modified;

            try
            {
                await db.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!SantaExists(id))
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

        // POST: api/Santas
        [Route("")]
        [ResponseType(typeof(Santa))]
        public async Task<IHttpActionResult> PostSanta(Santa santa)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            db.Santas.Add(santa);

            try
            {
                await db.SaveChangesAsync();
            }
            catch (DbUpdateException)
            {
                if (SantaExists(santa.Id))
                {
                    return Conflict();
                }
                else
                {
                    throw;
                }
            }

            return CreatedAtRoute("DefaultApi", new { id = santa.Id }, santa);
        }

        // DELETE: api/Santas/5
        [Route("{id}")]
        [ResponseType(typeof(Santa))]
        public async Task<IHttpActionResult> DeleteSanta(string id)
        {
            Santa santa = await db.Santas.FindAsync(id);
            if (santa == null)
            {
                return NotFound();
            }

            db.Santas.Remove(santa);
            await db.SaveChangesAsync();

            return Ok(santa);
        }

        protected override void Dispose(bool disposing)
        {
            if (disposing)
            {
                db.Dispose();
            }
            base.Dispose(disposing);
        }

        private bool SantaExists(string id)
        {
            return db.Santas.Count(e => e.Id == id) > 0;
        }
    }
}