using System;
using SantaFinder.Entities;

namespace SantaFinder.Web.Models.SantaOrders
{
    public class SantaOrderPreview
    {
        public int Id { get; set; }
        public string ClientName { get; set; }
        public DateTime Datetime { get; set; }
        public Address Address { get; set; }
        public OrderStatus Status { get; set; }

        public SantaOrderPreview() { }

        public SantaOrderPreview(Order order)
        {
            Id = order.Id;
            ClientName = order.Client.Name;
            Address = order.Address;
            Datetime = order.Datetime;
            Status = order.Status;
        }
    }
}