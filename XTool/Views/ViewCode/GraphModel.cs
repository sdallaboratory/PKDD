using XTool.Models.EvaluationModels;
using XTool.Models.TransferModels.GraphApi;

namespace XTool.Views.ViewCode
{
    public class GraphModel
    {
        public GraphType GraphType { get; set; }

        public string DataSource { get; set; }

        public Scales InitScales { get; set; }

        public int InitSelectionPercent { get; set; }

        public Algorithms InitAlgorithm { get; set; }
    }
}
