using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using XTool.Data.ModelInterfaces;
using XTool.Models.ModelInterfaces.DataAnnotations;

namespace XTool.Data.SearchEngine.SearchResult
{
    public interface ISearchResult<TOut>
    {
        int Neutral { get; set; }

        int Imporatnt { get; set; }

        int VeryImportant { get; set; }

        int Sum { get; }

        string FindedStrings { get; set; }

        SearchImportaceTypes Result { get; }

        TOut Data { get; }
    }
}
