﻿using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Security.Claims;
using System.Text;
using System.Threading.Tasks;
using Microsoft.AspNet.Identity;

namespace SantaFinder.Data.Entities
{
    [Table("Santas")]
    public class Santa : User
    {
        public string Name { get; set; }
        public string PhotoPath { get; set; }
    }
}
