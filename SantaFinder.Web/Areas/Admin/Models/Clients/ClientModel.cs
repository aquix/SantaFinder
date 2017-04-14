using SantaFinder.Entities;
using SantaFinder.Web.Areas.Admin.Models.Shared;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace SantaFinder.Web.Areas.Admin.Models.Clients
{
    public class ClientModel
    {
        public string Id { get; set; }
        public string Email { get; set; }
        public string Name { get; set; }
        public Address Address { get; set; }
        public Location Location { get; set; }
        public NewPassword NewPassword { get; set; }
    }
}