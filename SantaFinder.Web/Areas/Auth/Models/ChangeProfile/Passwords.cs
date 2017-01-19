using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace SantaFinder.Web.Areas.Auth.Models.ChangeProfile
{
    public class Passwords
    {
        public string OldPassword { get; set; }
        public string Password { get; set; }
        public string PasswordConfirmation { get; set; }
    }
}