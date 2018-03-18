using System.ComponentModel.DataAnnotations;
using XTool.Models.ActorModels.BaseTypes;
using XTool.Models.ModelInterfaces;

namespace XTool.Models.ActorModels
{
    public class CareerEvent : Event
    {
        public int TimePeriodId { get; set; }

        public override IUpdateble Update(IUpdateble model)
        {
            throw new System.NotImplementedException();
        }
    }
}