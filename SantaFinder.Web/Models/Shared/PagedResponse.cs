using System.Collections.Generic;

namespace SantaFinder.Web.Models.Shared
{
    public class PagedResponse<T>
    {
        public int TotalCount { get; set; }
        public IEnumerable<T> Items { get; set; }
    }
}