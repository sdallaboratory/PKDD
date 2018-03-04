using System.ComponentModel.DataAnnotations;
using XTool.Models.ActorModels.BaseTypes;

namespace XTool.Models.ActorModels
{
    public class Photo : Media
    {
        public int ActorId { get; set; }
    }
}