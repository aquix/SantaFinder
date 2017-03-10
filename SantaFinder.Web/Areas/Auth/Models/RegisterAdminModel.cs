using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace SantaFinder.Web.Areas.Auth.Models
{
    public class RegisterAdminModel
    {
        public string Email { get; set; }
        public string Password { get; set; }
        public string ConfirmPassword { get; set; }
        public string Name { get; set; }
    }
}