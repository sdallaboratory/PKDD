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
        IEnumerable<object> FindItems(Type type);
        IEnumerable<T> FindItems<T>(IEnumerable<TKey> ids) where T : class;
        IEnumerable<object> FindItems(Type type, IEnumerable<TKey> ids);

        T FindItemById<T>(TKey id) where T : class;
        object FindItemById(Type type, TKey id);

        T DeleteItemById<T>(TKey id) where T : class;
        object DeleteItemById(Type type, TKey id);

        T UpdateItem<T>(TKey id, T newValue) where T : class;
        object UpdateItem(Type type, TKey id, object newValue);

        TKey AddItem<T>(T item) where T : class;
        TKey AddItem(Type type, object item);
    }
}
