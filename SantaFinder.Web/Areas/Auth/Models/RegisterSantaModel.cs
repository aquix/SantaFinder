﻿using SantaFinder.Web.Util;

namespace SantaFinder.Web.Areas.Auth.Models
{
    public class RegisterSantaModel : RegisterModelBase
    {
        public string Name { get; set; }
        public FileModel Photo { get; set; }
    }
}