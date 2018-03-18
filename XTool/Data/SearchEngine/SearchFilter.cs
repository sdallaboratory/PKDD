using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace XTool.Data.SearchEngine
{
    public class SearchFilter : ISearchFilter
    {
        public string SearchString { get; set; }

        public bool IsAdvancedSearch { get; set; }

        public List<string> SearchPropsNames { get; set; }
    }
}
