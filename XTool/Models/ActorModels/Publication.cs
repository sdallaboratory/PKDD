using System.ComponentModel.DataAnnotations;
using XTool.Models.ModelInterfaces;
using XTool.Models.ModelInterfaces.DataAnnotations;

namespace XTool.Models.ActorModels
{
    public class Publication : IStorageModel<int>
    {
        public int Id { get; set; }
        
        public int ActorId { get; set; }

        public int Year { get; set; }

        [SearchEngine]
        [Required, StringLength(500)]
        public string Name { get; set; }

        [SearchEngine]
        [StringLength(4096)]
        public string Url { get; set; }

        [SearchEngine]
        [StringLength(2000)]
        public string Comment { get; set; }

        public IUpdateble Update(IUpdateble model)
        {
            throw new System.NotImplementedException();
        }
    }
}