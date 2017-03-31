using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace SantaFinder.Entities
{
    public class ChatMessage
    {
        public int Id { get; set; }

        [Column(TypeName = "ntext")]
        public string Body { get; set; }
        public DateTime Datetime { get; set; }

        public int OrderId { get; set; }
        public virtual Order Order { get; set; }
        public string SenderId { get; set; }
        public virtual User Sender { get; set; }
    }
}