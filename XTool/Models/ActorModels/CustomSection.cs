using System.ComponentModel.DataAnnotations;

namespace XTool.Models.ActorModels
{
    public class CustomSection
    {
        public int Id { get; set; }

        public int ActorId { get; set; }

        [Required, StringLength(200)]
        public string Title { get; set; }

        [Required, StringLength(10000)]
        public string Content { get; set; }

        [StringLength(2000)]
        public string Comment { get; set; }
    }
}