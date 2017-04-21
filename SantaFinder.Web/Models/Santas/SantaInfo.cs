using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace SantaFinder.Web.Models.Santas
{
    public class SantaInfo : SantaFullInfoForClient
    {
        public string Id { get; set; }
        public string Email { get; set; }
    }
}