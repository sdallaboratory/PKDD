using Newtonsoft.Json;
using Newtonsoft.Json.Linq;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace XTool.Models.TransferModels.TypesToEntityApi
{
    [JsonObject]
    public class RequestModel : TypeName, IUpdateble
    {
        [JsonProperty("ids")]
        public List<int> Ids { get; set; }

        [JsonProperty("body")]
        public JObject Body { get; set; }

        public IUpdateble Update(IUpdateble model)
        {
            throw new NotImplementedException();
        }
    }
}
