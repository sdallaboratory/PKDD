using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using XTool.Data.Storage;
using XTool.Data.ModelInterfaces;
using System.Reflection;
using XTool.Data.SearchEngine.SearchResult;

namespace XTool.Data.SearchEngine
{
    public interface ISearchEngine<TOut, TKey> where TOut : class, IStorageModel<TKey>
    {
        IStorage<TKey> Storage { get; }

        int ItemCount { get; }

        List<SearchResult<TOut>> FindItems(ISearchFilter filter);
    }
}
