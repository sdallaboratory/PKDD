using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using XTool.Data.ModelInterfaces.DataAnnotations;

namespace XTool.Models.ModelInterfaces.DataAnnotations
{
    [AttributeUsage(AttributeTargets.Property)]
    public class SearchEngineAttribute : Attribute
    {
        public SearchImportaceTypes Importance { get; }

        public ComplexType Complexity { get; }

        public SearchType SearchType { get; set; }

        public SearchEngineAttribute(SearchImportaceTypes type, ComplexType complex)
        {
            SearchType = SearchType.Simple;
            Importance = type;
            Complexity = complex;
        }

        public SearchEngineAttribute(SearchType search, SearchImportaceTypes type, ComplexType complex)
        {
            SearchType = search;
            Importance = type;
            Complexity = complex;
        }
    }
}
