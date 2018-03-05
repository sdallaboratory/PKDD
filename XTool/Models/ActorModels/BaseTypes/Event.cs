using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace XTool.Models.ActorModels.BaseTypes
{
    public abstract class Event
    {
        public int Id { get; set; }

        [Required, StringLength(2000)]
        public string Description { get; set; }

        [Required, StringLength(20)] // Добавить бы RegularExpression
        public string Period { get; set; }

        [StringLength(2000)]
        public string Comment { get; set; }
    }
}
