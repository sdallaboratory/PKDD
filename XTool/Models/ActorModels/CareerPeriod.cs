using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using XTool.Data.ModelInterfaces;
using XTool.Models.ModelInterfaces.DataAnnotations;

namespace XTool.Models.ActorModels
{
    public class CareerPeriod : IStorageModel<int>
    {
        public int Id { get; set; }
        
        public int ActorId { get; set; }

        [StringLength(20)] // Добавить бы RegularExpression
        public string Period { get; set; }

        public List<CareerEvent> CareerEvents { get; set; } = new List<CareerEvent>();

        public IUpdateble Update(IUpdateble model)
        {
            throw new System.NotImplementedException();
        }
    }
}