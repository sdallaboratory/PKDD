using Newtonsoft.Json;
using Newtonsoft.Json.Converters;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace XTool.Models.TransferModels.GraphApi
{
    public class ScalesRequest
    {
        public int ExpertId { get; set; }

        public int ActorId { get; set; }

        [JsonConverter(typeof(StringEnumConverter))]
        public Algorithms Algorithm { get; set; }

        public int SelectionPercent { get; set; }
    }
}
