using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace SantaFinder.Web.Areas.Auth.Models.ChangeProfile
{
    public interface IProfileChangeModel
    {
        string Email { get; set; }
        string Password { get; set; }
        NewPasswordModel NewPassword { get; set; }
    }
}
