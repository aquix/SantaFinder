using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Threading.Tasks;
using System.Web.Http;
using SantaFinder.Web.Models.Santas;
using SantaFinder.Web.Services;

namespace SantaFinder.Web.Controllers
{
    [Authorize(Roles = "client")]
    [RoutePrefix("api/santaFullInfo")]
    public class SantaFullInfoController : ApiController
    {
        private SantasService _santasService;

        public SantaFullInfoController(SantasService santasService)
        {
            _santasService = santasService;
        }

        [HttpGet]
        [Route("{santaId}")]
        public async Task<SantaFullInfoForClient> Get(string santaId)
        {
            var serverUrl = Request.RequestUri.GetLeftPart(UriPartial.Authority);
            return await _santasService.GetSantaFullInfo(santaId, serverUrl);
        }

        [HttpGet]
        [Route("{santaId}/loadFeedbacks")]
        public async Task<IEnumerable<FeedbackItem>> LoadNextFeedbacks(string santaId, int startIndex = 0)
        {
            return await _santasService.LoadNextFeedbacks(santaId, startIndex);
        }
    }
}
