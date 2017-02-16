using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace SantaFinder.Web.Areas.Auth.Models.ChangeProfile
{
    public class NewPasswordModel
    {
        public string Password { get; set; }
        public string PasswordConfirmation { get; set; }
    }
}