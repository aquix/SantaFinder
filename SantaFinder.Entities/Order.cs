using System;
using System.Collections.Generic;

namespace SantaFinder.Entities
{
    public class Order
    {
        public int Id { get; set; }
        public string ChildrenNames { get; set; }
        public DateTime Datetime { get; set; }
        public bool UseProfileAddress { get; set; }
        public Address Address { get; set; }
        public Location Location { get; set; }
        public OrderStatus Status { get; set; }
        public float? Rating { get; set; }

        public virtual ICollection<Present> Presents { get; set; }
        public string ClientId { get; set; }
        public virtual Client Client { get; set; }
        public string SantaId { get; set; }
        public virtual Santa Santa { get; set; }
    }
}
