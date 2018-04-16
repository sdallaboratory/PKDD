using System.ComponentModel.DataAnnotations;
using XTool.Models.ActorModels.BaseTypes;
using XTool.Data.ModelInterfaces;

namespace XTool.Models.ActorModels
{
    public class Photo : Media
    {
        public int ActorId { get; set; }

        public override IUpdateble Update(IUpdateble model)
        {
            throw new System.NotImplementedException();
        }
    }
}