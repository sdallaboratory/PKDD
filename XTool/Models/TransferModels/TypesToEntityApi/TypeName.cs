using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace XTool.Models.TransferModels.TypesToEntityApi
{
    [JsonObject]
    public class TypeName : IUpdateble
    {
        [JsonProperty("name")]
        public string Name { get; set; }

        public IUpdateble Update(IUpdateble model)
        {
            throw new NotImplementedException();
        }
    }
}
