using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace SantaFinder.Web.Areas.Auth.Models
{
    public class RegisterSantaModel : RegisterModelBase
    {
        public string Name { get; set; }
    }
}