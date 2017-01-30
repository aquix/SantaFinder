namespace SantaFinder.Web.Models.Santas
{
    public class SantaInfoForClient
    {
        public string Id { get; set; }
        public string Name { get; set; }
        public string PhotoPath { get; set; }
        public float? Rating { get; set; }
        public int NumberOfOrders { get; set; }
    }
}