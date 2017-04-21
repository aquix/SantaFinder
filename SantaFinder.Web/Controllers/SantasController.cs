using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using System.Web.Http;
using SantaFinder.Web.Models.Santas;
using SantaFinder.Web.Models.Shared;
using SantaFinder.Web.Services;

namespace SantaFinder.Web.Controllers
{
    // [Authorize(Roles = "client")]
    [RoutePrefix("api/santas")]
    public class SantasController : ApiController
    {
        private SantasService _santasService;

        public SantasController(SantasService santasService)
        {
            _santasService = santasService;
        }

        public async Task<PagedResponse<SantaInfoForClient>> Get(int count, int page = 0)
        {
            var serverUrl = Request.RequestUri.GetLeftPart(UriPartial.Authority);
            return await _santasService.GetAllSantas(count, page, serverUrl);
        }

        [HttpGet]
        [Route("getSantaList")]
        public async Task<PagedResponse<SantaInfo>> GetSantasList(int count, int page = 0)
        {
            var serverUrl = Request.RequestUri.GetLeftPart(UriPartial.Authority);
            return await _santasService.GetSantaList(count, page, serverUrl);
        }
    }
}
