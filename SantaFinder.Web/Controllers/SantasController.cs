using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Threading.Tasks;
using System.Web.Http;
using SantaFinder.Web.Models.Santas;
using SantaFinder.Web.Models.Shared;
using SantaFinder.Web.Services;

namespace SantaFinder.Web.Controllers
{
    public class SantasController : ApiController
    {
        private SantasService _santasService;

        public SantasController(SantasService santasService)
        {
            _santasService = santasService;
        }

        public async Task<PagedResponse<SantaInfoForClient>> Get(int count, int page = 0)
        {
            return await _santasService.GetAllSantas(count, page);
        }
    }
}
