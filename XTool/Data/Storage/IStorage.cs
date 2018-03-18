using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using XTool.Data.Storage;
using XTool.Models.ModelInterfaces;

namespace XTool.Data.Storage
{
    public interface IStorage<TKey>
    {
        DbContext Context { get; set; }

        List<T> GetAll<T>() where T : class, IStorageModel<TKey>;
        List<object> GetAll(Type type);
        IQueryable<T> GetAllQueryable<T>() where T : class, IStorageModel<TKey>;
        IQueryable<object> GetAllQueryable(Type type);

        List<T> Get<T>(IEnumerable<TKey> ids) where T : class, IStorageModel<TKey>;
        List<object> Get(Type type, IEnumerable<TKey> ids);

        T Get<T>(TKey id) where T : class, IStorageModel<TKey>;
        object Get(Type type, TKey id);

        T Delete<T>(TKey id) where T : class, IStorageModel<TKey>;
        object Delete(Type type, TKey id);

        T Update<T>(TKey id, T newValue) where T : class, IStorageModel<TKey>;
        object Update(Type type, TKey id, object newValue);

        TKey Add<T>(T item) where T : class, IStorageModel<TKey>;
        TKey Add(Type type, object item);

        int Count<T>() where T : class, IStorageModel<TKey>;
        int Count(Type type);

        IEnumerable<TKey> GetIds<T>(int? count = null) where T : class, IStorageModel<TKey>;
        IEnumerable<TKey> GetIds(Type type, int? count = null);

        IEnumerable<Type> GetAllTypes();
    }
}
