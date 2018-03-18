using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using XTool.Data.Storage;
using XTool.Models.ModelInterfaces;

namespace XTool.Data.SearchEngine
{
    interface ISearchEngine<TOut, TKey> where TOut : class, IStorageModel<TKey>
    {
        IStorage<TKey> Storage { get; }

        Type[] SearchableTypes { get; set; }

        Type[] ProcessBaseType();

        List<TOut> FindItems(ISearchFilter filter);
    }
}
