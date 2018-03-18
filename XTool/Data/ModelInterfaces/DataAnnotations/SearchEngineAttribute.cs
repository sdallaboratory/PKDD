using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace XTool.Models.ModelInterfaces.DataAnnotations
{
    [AttributeUsage(AttributeTargets.Property)]
    public class SearchEngineAttribute : Attribute
    {
        public SearchImportaceTypes Importance { get; }

        public SearchEngineAttribute()
        {
            Importance = SearchImportaceTypes.Neutral;
        }

        public SearchEngineAttribute(SearchImportaceTypes type)
        {
            Importance = type;
        }
    }
}
