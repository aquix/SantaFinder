﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace SantaFinder.Web.Areas.Auth.Models.ChangeProfile
{
    public class SantaModelChange
    {
        public string Email { get; set; }
        public Passwords Passwords { get; set; }
        public string Name { get; set; }
    }
}