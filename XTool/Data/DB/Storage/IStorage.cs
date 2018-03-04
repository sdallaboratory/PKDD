using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using XTool.Data.Storage;

namespace XTool.Data.Storage
{
    public interface IStorage<TKey>
    {
        DbContext Context { get; }

        IEnumerable<T> FindItems<T>() where T : class;
        // next time needs to realization ===> IEnumerable<object> FindItems(Type type);

        T FindItemById<T>(TKey id) where T : class;
        object FindItemById(Type type, TKey id);

        T DeleteItemById<T>(TKey id) where T : class;
        object DeleteItemById(Type type, TKey id);

        T UpdateItem<T>(TKey id, Func<T, T, T> updateFunc, T newValue) where T : class;
        object UpdateItem(Type type, TKey id, Func<object, object, object> updateFunc, object newValue);

        TKey AddItem<T>(T item) where T : class;
        TKey AddItem(Type type, object item);
    }
}
