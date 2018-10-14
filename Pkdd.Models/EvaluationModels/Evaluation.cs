using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Pkdd.Models;
using Pkdd.Models.Person;

namespace XTool.Models.EvaluationModels
{
    public class Evaluation
    {
        public int Id { get; set; }

        public virtual Scales Scales { get; set; }

        [StringLength(2000)]
        public string Comment { get; set; }

        public DateTime LastChange { get; set; }

        public int PersonId { get; set; }

        public virtual Person Person { get; set; }

        public int ExpertId { get; set; }
  
    }
}
