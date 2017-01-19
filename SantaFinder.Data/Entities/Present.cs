using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace SantaFinder.Data.Entities
{
    public class Present
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public bool BuyBySanta { get; set; }

        public int OrderId { get; set; }
        public virtual Order Order { get; set; }
    }
}
