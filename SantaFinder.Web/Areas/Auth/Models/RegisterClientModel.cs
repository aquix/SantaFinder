using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using SantaFinder.Data.Entities;

namespace SantaFinder.Web.Areas.Auth.Models
{
    public class RegisterClientModel : RegisterModelBase
    {
        public string Name { get; set; }
        public Address Address { get; set; }
    }
}