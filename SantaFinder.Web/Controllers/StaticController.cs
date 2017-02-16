using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Threading.Tasks;
using System.Web.Hosting;
using System.Web.Http;
using SantaFinder.Web.Services;
using SantaFinder.Web.Util;

namespace SantaFinder.Web.Controllers
{
    [RoutePrefix("static")]
    public class StaticController : ApiController
    {
        private StaticService _staticService;

        public StaticController(StaticService staticService)
        {
            _staticService = staticService;
        }

        [HttpGet]
        [Route("santaPhotos/{santaId}")]
        public async Task<IHttpActionResult> SantaPhotos(string santaId)
        {
            var filePathAndType = await _staticService.GetPhotoPathAndType(santaId, HostingEnvironment.MapPath);

            return new FileResult(filePathAndType.Item1, filePathAndType.Item2);
        }
    }
}
