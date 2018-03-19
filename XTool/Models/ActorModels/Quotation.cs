using System.ComponentModel.DataAnnotations;
using XTool.Data.ModelInterfaces;
using XTool.Models.ModelInterfaces.DataAnnotations;

namespace XTool.Models.ActorModels
{
    public class Quotation : IStorageModel<int>
    {
        public int Id { get; set; }

        public int ActorId { get; set; }

        [StringLength(2000)]
        public string Text { get; set; }

        [StringLength(2000)]
        public string Comment { get; set; }

        public IUpdateble Update(IUpdateble model)
        {
            throw new System.NotImplementedException();
        }
    }
}