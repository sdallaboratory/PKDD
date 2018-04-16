using System.ComponentModel.DataAnnotations;
using XTool.Data.ModelInterfaces;
using XTool.Models.ModelInterfaces.DataAnnotations;

namespace XTool.Models.ActorModels
{
    public class CustomSection : IStorageModel<int>
    {
        public int Id { get; set; }

        public int ActorId { get; set; }

        [Required, StringLength(200)]
        public string Title { get; set; }

        [Required, StringLength(10000)]
        public string Content { get; set; }

        [StringLength(2000)]
        public string Comment { get; set; }

        public IUpdateble Update(IUpdateble model)
        {
            throw new System.NotImplementedException();
        }
    }
}