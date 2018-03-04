using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace XTool.Models.ActorModels
{
    public class CareerPeriod
    {
        public int ActorId { get; set; }

        [StringLength(20)] // Добавить бы RegularExpression
        public string Period { get; set; }

        public List<CareerEvent> CareerEvents { get; set; }
    }
}