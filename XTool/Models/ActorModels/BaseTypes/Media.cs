using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace XTool.Models.ActorModels.BaseTypes
{
    public abstract class Media
    {
        [Required, StringLength(4096)]
        public string Url { get; set; }

        [StringLength(2000)]
        public string Description { get; set; }

        [StringLength(2000)]
        public string Comment { get; set; }
    }
}
