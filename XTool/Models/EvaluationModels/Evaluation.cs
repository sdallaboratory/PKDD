using System;
using System.ComponentModel.DataAnnotations;
using XTool.Models.ActorModels;

namespace XTool.Models.EvaluationModels
{
    public class Evaluation
    {
        public int Id { get; set; }

        public int ScalesId { get; set; }

        [StringLength(2000)]
        public string Comment { get; set; }

        public DateTime LastChange { get; set; }


        public int ActorId { get; set; }

        public Actor Actor { get; set; }


        public int UserId { get; set; }

        //public XToolUser Expert { get; set; }
    }
}
