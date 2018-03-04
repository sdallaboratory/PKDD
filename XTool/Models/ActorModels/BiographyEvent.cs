using System.ComponentModel.DataAnnotations;
using XTool.Models.ActorModels.BaseTypes;

namespace XTool.Models.ActorModels
{
    public class BiographyEvent : Event
    {
        public int ActorId { get; set; }
    }
}