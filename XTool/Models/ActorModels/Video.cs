using System.ComponentModel.DataAnnotations;
using XTool.Models.ActorModels.BaseTypes;

namespace XTool.Models.ActorModels
{
    public class Video : Media
    {
        public int ActorId { get; set; }

        //string GetHost();
    }
}