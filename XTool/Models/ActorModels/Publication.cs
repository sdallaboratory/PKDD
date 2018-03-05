using System.ComponentModel.DataAnnotations;

namespace XTool.Models.ActorModels
{
    public class Publication
    {
        public int Id { get; set; }
        
        public int ActorId { get; set; }

        [Required, StringLength(500)]
        public string Name { get; set; }

        [StringLength(4096)]
        public string Url { get; set; }

        [StringLength(2000)]
        public string Comment { get; set; }
    }
}