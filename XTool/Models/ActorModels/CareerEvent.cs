using System.ComponentModel.DataAnnotations;
using XTool.Models.ActorModels.BaseTypes;

namespace XTool.Models.ActorModels
{
    public class CareerEvent : Event
    {
        public int TimePeriodId { get; set; }
    }
}