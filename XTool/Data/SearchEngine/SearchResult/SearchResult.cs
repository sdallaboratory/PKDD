using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using XTool.Models.ModelInterfaces.DataAnnotations;

namespace XTool.Data.SearchEngine.SearchResult
{
    public class SearchResult<TOut> : ISearchResult<TOut>
    {
        private int neutral = 0;
        public int Neutral
        {
            get => neutral;
            set => neutral++;
        }

        private int important = 0;
        public int Imporatnt
        {
            get => important;
            set => important++;
        }

        private int veryImportant;
        public int VeryImportant
        {
            get => veryImportant;
            set => veryImportant++;
        }

        public TOut Data { get; }

        public SearchImportaceTypes Result => Process();

        public int Sum => Neutral + Imporatnt + VeryImportant;

        public string FindedStrings { get; set; }

        public SearchResult()
        {

        }

        public SearchResult(TOut data)
        {
            Data = data;
        }

        private SearchImportaceTypes Process()
        {
            return VeryImportant > 0 ?
                SearchImportaceTypes.VeryImportant : Imporatnt > 0 ?
                SearchImportaceTypes.Important : SearchImportaceTypes.Neutral;
        }
    }
}