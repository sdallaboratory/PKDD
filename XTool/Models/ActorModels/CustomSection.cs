using System.ComponentModel.DataAnnotations;
using XTool.Models.ModelInterfaces;
using XTool.Models.ModelInterfaces.DataAnnotations;

namespace XTool.Models.ActorModels
{
    public class CustomSection : IStorageModel<int>
    {
        public int Id { get; set; }

        public int ActorId { get; set; }

        [SearchEngine]
        [Required, StringLength(200)]
        public string Title { get; set; }

        [SearchEngine]
        [Required, StringLength(10000)]
        public string Content { get; set; }

        [SearchEngine]
        [StringLength(2000)]
        public string Comment { get; set; }

        public IUpdateble Update(IUpdateble model)
        {
            throw new System.NotImplementedException();
        }
    }
}