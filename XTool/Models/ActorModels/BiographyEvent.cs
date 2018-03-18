using System.ComponentModel.DataAnnotations;
using XTool.Models.ActorModels.BaseTypes;
using XTool.Models.ModelInterfaces;

namespace XTool.Models.ActorModels
{
    public class BiographyEvent : Event
    {
        public int ActorId { get; set; }

        public override IUpdateble Update(IUpdateble model)
        {
            throw new System.NotImplementedException();
        }
    }
}