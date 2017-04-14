using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace SantaFinder.Web.Areas.Admin.Models.Shared
{
    public class NewPassword
    {
        public string Password { get; set; }
        public string Confirmation { get; set; }
    }
}