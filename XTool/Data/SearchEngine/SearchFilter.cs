using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace XTool.Data.SearchEngine
{
    [JsonObject]
    public class SearchFilter : ISearchFilter
    {
        [JsonProperty("searchString")]
        public string SearchString { get; set; }

        [JsonProperty("isAdvancedSearch")]
        public bool IsAdvancedSearch { get; set; }

        [JsonProperty("searchPropsNames")]
        public List<string> SearchPropsNames { get; set; }

        [JsonProperty("page")]
        public int Page { get; set; }

        [JsonProperty("elementOnPage")]
        public int ElementOnPage { get; set; }
    }
}