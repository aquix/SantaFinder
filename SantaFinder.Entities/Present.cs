namespace SantaFinder.Entities
{
    public class Present
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public bool BuyBySanta { get; set; }

        public int OrderId { get; set; }
        public virtual Order Order { get; set; }
    }
}
