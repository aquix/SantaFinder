using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace SantaFinder.Web.Areas.Auth.Models
{
    public class RegisterClientModel : RegisterModelBase
    {
        public string Name { get; set; }
        public AddressViewModel Address { get; set; }
    }
}