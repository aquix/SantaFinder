﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using SantaFinder.Data.Entities;

namespace SantaFinder.Web.Areas.Auth.Models.ChangeProfile
{
    public class ClientModelChange
    {
        public string Email { get; set; }
        public Passwords Passwords { get; set; }
        public string Name { get; set; }
        public Address Address { get; set; }
    }
}