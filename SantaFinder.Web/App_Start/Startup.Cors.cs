using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Web;
using Microsoft.Owin;
using Microsoft.Owin.Cors;
using Microsoft.Owin.FileSystems;
using Microsoft.Owin.StaticFiles;
using Owin;

namespace SantaFinder.Web
{
    public partial class Startup
    {
        public void ConfigureCors(IAppBuilder app)
        {
            // TODO only for 'clientUrl'
            app.UseCors(CorsOptions.AllowAll);
        }
    }
}