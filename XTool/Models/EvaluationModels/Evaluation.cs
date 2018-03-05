using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using XTool.Models.ActorModels;
using XTool.Models.Roles;

namespace XTool.Models.EvaluationModels
{
    public class Evaluation
    {
        public int ScalesId { get; set; }

        public virtual Scales Scales { get; set; }

        [StringLength(2000)]
        public string Comment { get; set; }

        public DateTime LastChange { get; set; }


        public int ActorId { get; set; }

        public Actor Actor { get; set; }


        public int ExpertId { get; set; }

        public XToolUser Expert { get; set; }
    }
}
