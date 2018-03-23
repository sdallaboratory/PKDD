using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using XTool.Data.ModelInterfaces;
using XTool.Models.ActorModels;
using XTool.Models.Roles;

namespace XTool.Models.EvaluationModels
{
    public class Evaluation : IStorageModel<int>
    {
        public int Id { get; set; }

        public int ScalesId { get; set; }

        public virtual Scales Scales { get; set; }

        [StringLength(2000)]
        public string Comment { get; set; }

        public DateTime LastChange { get; set; }


        public int ActorId { get; set; }

        public virtual Actor Actor { get; set; }

        public int ExpertId { get; set; }

        public virtual XToolUser Expert { get; set; }

        public IUpdateble Update(IUpdateble model)
        {
            throw new NotImplementedException();
        }
    }
}
