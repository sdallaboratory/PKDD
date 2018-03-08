using System.ComponentModel.DataAnnotations;

namespace XTool.Models.ActorModels
{
    internal class Quotation
    {
        public int Id { get; set; }

        public int ActorId { get; set; }

        [StringLength(2000)]
        public string Text { get; set; }

        [StringLength(2000)]
        public string Comment { get; set; }
    }
}