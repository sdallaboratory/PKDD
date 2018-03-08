using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
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

        [NotMapped]
        public string Start => string.Concat(Period.Where(c => "1234567890-".Contains(c))).Split('-').FirstOrDefault();
        [NotMapped]
        public string End => string.Concat(Period.Where(c => "1234567890-".Contains(c))).Split('-').ElementAtOrDefault(1);
    }
}
