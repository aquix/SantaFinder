using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace SantaFinder.Entities
{
    [Table("Admins")]
    public class Admin : User
    {
    }
}
