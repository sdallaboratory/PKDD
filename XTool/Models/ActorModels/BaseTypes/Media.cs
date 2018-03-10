using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;

namespace XTool.Models.ActorModels.BaseTypes
{
    public abstract class Media
    {
        public int Id { get; set; }
        
        [Required, StringLength(4096)]
        public string Url { get; set; }

        [StringLength(2000)]
        public string Description { get; set; }

        [StringLength(2000)]
        public string Comment { get; set; }
    }
}
