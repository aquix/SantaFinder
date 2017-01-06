using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Claims;
using System.Threading.Tasks;
using System.Web;
using Microsoft.AspNet.Identity;
using Microsoft.AspNet.Identity.EntityFramework;
using Microsoft.AspNet.Identity.Owin;
using Microsoft.Owin.Security.DataProtection;
using SantaFinder.Data.Context;
using SantaFinder.Data.Entities;

namespace SantaFinder.Web.Areas.Auth.Managers
{
    public class ClientManager : AppUserManager<Client>
    {
        public ClientManager(IUserStore<Client> store) : base(store)
        {
        }
    }
}