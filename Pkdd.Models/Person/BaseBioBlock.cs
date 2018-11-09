using Newtonsoft.Json;
using Pkdd.Abstractions.Entity;
using System;
using System.Collections.Generic;
using System.Text;

namespace Pkdd.Models.Persons
{
    [JsonObject]
    public class BaseBioBlock : EntityBase<BaseBioBlock>
    {
        [JsonProperty("personId")]
        public int PersonId { get; set; }
        [JsonIgnore]
        public Person Person { get; set; }

        [JsonProperty("contentBlocks")]
        public List<ContentBlock> ContentBlocks { get; set; }

        public override BaseBioBlock Update(BaseBioBlock entity)
        {
            throw new NotImplementedException();
        }
    }
}
