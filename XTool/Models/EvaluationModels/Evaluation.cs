using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using XTool.Models.ActorModels;

namespace XTool.Models.EvaluationModels
{
    public class Evaluation
    {
        public Scales Scales { get; set; }

        public string Comment { get; set; }

        public DateTime LastChange { get; set; }

        public Actor Actor { get; set; }

        //public XToolUser Expert { get; set; }
    }
}
