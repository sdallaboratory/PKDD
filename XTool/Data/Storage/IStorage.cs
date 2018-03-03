using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace XTool.Data
{
    public interface IStorage<TKey>
    {
        XToolDBContext Context { get; }

        IEnumerable<T> FindItems<T>() where T : class;

        T FindItemById<T>(TKey id) where T : class;

        T DeleteItemById<T>(TKey id) where T : class;

        T UpdateItem<T>(TKey id, Func<T, T, T> updateFunc, T newValue) where T : class;

        TKey AddItem<T>(T item) where T : class;
    }
}
