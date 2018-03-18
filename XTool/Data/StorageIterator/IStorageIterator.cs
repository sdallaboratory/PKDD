using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using XTool.Data.Storage;

namespace XTool.Data.StorageIterator
{
    public interface IStorageIterator<TKey, TOut> where TOut : class
    {
        IStorage<TKey> Storage { get; set; }

        List<TOut> TakeItemsForward(int count);

        List<TOut> TakeItemsBackward(int count);

        bool RewindForward(int count);

        bool RewindBackward(int count);
    }
}
