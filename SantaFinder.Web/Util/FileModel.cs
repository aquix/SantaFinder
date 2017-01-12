using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace SantaFinder.Web.Util
{
    public class FileModel
    {
        public string Filename { get; set; }

        public int ContentLength { get; set; }

        public byte[] Content { get; set; }

    }
}