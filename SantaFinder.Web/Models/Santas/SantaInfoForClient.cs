namespace SantaFinder.Web.Models.Santas
{
    public class SantaInfoForClient
    {
        public string Id { get; set; }
        public string Name { get; set; }
        public string PhotoUrl { get; set; }
        public float? Rating { get; set; }
        public int NumberOfOrders { get; set; }
    }
}