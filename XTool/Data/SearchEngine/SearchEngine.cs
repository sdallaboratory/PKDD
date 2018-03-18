using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using XTool.Data.Storage;

namespace XTool.Data.SearchEngine
{
    public class SearchEngine<TOut, TKey> : ISearchEngine<TOut, TKey> where TOut : class
    {
        public IStorage<TKey> Storage { get; set; }

        public SearchEngine(IStorage<TKey> storage)
        {
            Storage = storage;
        }

        public List<TOut> FindItem(string searchString)
        {
            throw new NotImplementedException();
        }
    }
}
