using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using XTool.Data.ModelInterfaces;

namespace XTool.Models.TransferModels.TypesToEntityApi
{
    [JsonObject]
    public class TypeName
    {
        [JsonProperty("name")]
        public string Name { get; set; }
    }
}
