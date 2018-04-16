using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace XTool.Data.SearchEngine
{
    public interface ISearchFilter
    {
        string SearchString { get; set; }

        int Page { get; set; }

        int ElementOnPage { get; set; }

        bool IsAdvancedSearch { get; set; }

        List<string> SearchPropsNames { get; set; }
    }
}
