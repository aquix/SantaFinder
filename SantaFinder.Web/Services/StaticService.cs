using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using System.Web;
using SantaFinder.Data.Context;

namespace SantaFinder.Web.Services
{
    public class StaticService
    {
        private const string DefaultSantaPhoto = "~/App_Data/santa-default-photo.png";
        private IDbContext _db;

        public StaticService(IDbContext db)
        {
            _db = db;
        }

        public async Task<Tuple<string, string>> GetPhotoPathAndType(string santaId, Func<string, string> mapPath)
        {
            var santa = await _db.Santas.FindAsync(santaId);
            var filePath = santa.PhotoPath;
            if (filePath == null)
            {
                filePath = mapPath(DefaultSantaPhoto);
            }
            var type = MimeMapping.GetMimeMapping(filePath);

            return new Tuple<string, string>(filePath, type);
        }
    }
}