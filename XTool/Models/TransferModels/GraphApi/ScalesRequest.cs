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
        public int Id { get; set; }

        [JsonConverter(typeof(StringEnumConverter))]
        public Algorithms Algorithm { get; set; }

        public int selectionPercent { get; set; }
    }
}
