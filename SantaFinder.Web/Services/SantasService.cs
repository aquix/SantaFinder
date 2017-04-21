using System.Collections;
using System.Collections.Generic;
using System.Data.Entity;
using System.Linq;
using System.Threading.Tasks;
using SantaFinder.Data.Context;
using SantaFinder.Entities;
using SantaFinder.Web.Models.Santas;
using SantaFinder.Web.Models.Shared;

namespace SantaFinder.Web.Services
{
    public class SantasService
    {
        private IDbContext _db;

        public SantasService(IDbContext db)
        {
            _db = db;
        }

        public async Task<PagedResponse<SantaInfoForClient>> GetAllSantas(int count, int page, string serverUri)
        {
            var santas = await _db.Santas
                .OrderByDescending(s => s.Rating)
                .Skip(page * count)
                .Take(count)
                .Select(s => new SantaInfoForClient
                {
                    Id = s.Id,
                    Name = s.Name,
                    NumberOfOrders = s.NumberOfOrders,
                    PhotoUrl = serverUri + "/static/santaPhotos/" + s.Id,
                    Rating = s.Rating
                })
                .ToListAsync();

            return new PagedResponse<SantaInfoForClient>
            {
                Items = santas,
                TotalCount =  await _db.Santas.CountAsync()
            };
        }

        public async Task<SantaFullInfoForClient> GetSantaFullInfo(string id, string serverUri)
        {
            var santa = await _db.Santas.FindAsync(id);
            var feedbacks = await LoadNextFeedbacks(id);

            return new SantaFullInfoForClient
            {
                Name = santa.Name,
                PhotoUrl = serverUri + "/static/santaPhotos/" + santa.Id,
                NumberOfOrders = santa.NumberOfOrders,
                Rating = santa.Rating ?? 0,
                Feedbacks = feedbacks
            };
        }

        public async Task<IEnumerable<FeedbackItem>> LoadNextFeedbacks(string santaId, int startIndex = 0)
        {
            const int feedbacksCount = 10;

            return await _db.Orders
                .Where(o => o.SantaId == santaId)
                .Where(o => o.Status == OrderStatus.Completed)
                .OrderByDescending(o => o.Datetime)
                .Skip(startIndex)
                .Take(feedbacksCount)
                .Select(o => new FeedbackItem
                {
                    ClientName = o.Client.Name,
                    Rating = o.Rating ?? 0,
                    Datetime = o.Datetime
                })
                .ToListAsync();
        }

        public async Task<PagedResponse<SantaInfo>> GetSantaList(int count, int page, string serverUri)
        {
            var listOfSanta = _db.Santas;

            var santas = (await listOfSanta
                .OrderByDescending(o => o.Name)
                .Skip(page * count)
                .Take(count)
                .ToListAsync())
                .Select(o => new SantaInfo
                {
                    Id = o.Id,
                    Email = o.Email,
                    Name = o.Name,
                    PhotoUrl = o.PhotoPath
                });

            return new PagedResponse<SantaInfo>
            {
                Items = santas,
                TotalCount = await listOfSanta.CountAsync()
            };
        }
    }
}