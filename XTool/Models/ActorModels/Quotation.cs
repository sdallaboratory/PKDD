using System.ComponentModel.DataAnnotations;
using XTool.Models.ModelInterfaces;
using XTool.Models.ModelInterfaces.DataAnnotations;

namespace XTool.Models.ActorModels
{
    public class Quotation : IStorageModel<int>
    {
        public int Id { get; set; }

        public int ActorId { get; set; }

        [SearchEngine]
        [StringLength(2000)]
        public string Text { get; set; }

        [SearchEngine]
        [StringLength(2000)]
        public string Comment { get; set; }

        public IUpdateble Update(IUpdateble model)
        {
            throw new System.NotImplementedException();
        }
    }
}