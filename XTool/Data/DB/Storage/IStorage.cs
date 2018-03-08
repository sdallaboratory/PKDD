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

        IEnumerable<T> GetAll<T>() where T : class;
        IEnumerable<object> GetAll(Type type);
        IEnumerable<T> Get<T>(IEnumerable<TKey> ids) where T : class;
        IEnumerable<object> Get(Type type, IEnumerable<TKey> ids);

        T Get<T>(TKey id) where T : class;
        object Get(Type type, TKey id);

        T Delete<T>(TKey id) where T : class;
        object Delete(Type type, TKey id);

        T Update<T>(TKey id, T newValue) where T : class;
        object Update(Type type, TKey id, object newValue);

        TKey Add<T>(T item) where T : class;
        TKey Add(Type type, object item);

        int Count<T>() where T : class;
        int Count(Type type);
    }
}
