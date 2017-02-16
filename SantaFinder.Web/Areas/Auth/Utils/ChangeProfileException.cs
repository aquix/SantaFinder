using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using Microsoft.AspNet.Identity;

namespace SantaFinder.Web.Areas.Auth.Utils
{
    public class ChangeProfileException : Exception
    {
        public IdentityResult Result { get; set; }

        public ChangeProfileException(IdentityResult identityResult)
        {
            Result = identityResult;
        }
    }
}