using System.ComponentModel.DataAnnotations;
using XTool.Data.ModelInterfaces;
using XTool.Models.ModelInterfaces.DataAnnotations;

namespace XTool.Models.ActorModels
{
    public class Publication : IStorageModel<int>
    {
        public int Id { get; set; }
        
        public int ActorId { get; set; }

        public int Year { get; set; }

        [Required, StringLength(500)]
        public string Name { get; set; }

        [StringLength(4096)]
        public string Url { get; set; }

        [StringLength(2000)]
        public string Comment { get; set; }

        public IUpdateble Update(IUpdateble model)
        {
            throw new System.NotImplementedException();
        }
    }
}