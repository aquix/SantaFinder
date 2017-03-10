using SantaFinder.Entities;

namespace SantaFinder.Web.Models.UsersList
{
    public class ClientInfo
    {
        public string Id { get; set; }
        public string Email { get; set; }
        public string Name { get; set; }
        public Address Address { get; set; }
    }
}