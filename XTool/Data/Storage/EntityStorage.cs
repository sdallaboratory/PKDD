using Microsoft.EntityFrameworkCore;
using System;
using System.Collections;
using System.Collections.Generic;
using System.Linq;
using System.Reflection;
using System.Reflection.Emit;
using System.Threading.Tasks;
using XTool.Data.Storage;
using XTool.Models;
using Microsoft.EntityFrameworkCore.Infrastructure;
using XTool.Data.ModelInterfaces;

namespace XTool.Data
{
    public abstract class EntityStorage<TKey> : IStorage<TKey>
    {
        public DbContext Context { get; set; }

        public EntityStorage(DbContext context)
        {
            Context = context;
        }

        public virtual TKey Add<T>(T item) where T : class, IStorageModel<TKey>
        {
            return Add(typeof(T), item);
        }

        public virtual TKey Add(Type type, object item)
        {
            TKey result = default(TKey);
            if (item != null)
            {
                var set = GetDbSet(type);
                var setMethod = set.PropertyType.GetMethods().FirstOrDefault(x => x.Name == "Add");
                Convert.ChangeType(item, type);
                var a = setMethod.Invoke(set.GetValue(Context), new object[] { item });
                Context.SaveChanges();
            }
            return result;
        }

        public virtual T Delete<T>(TKey id) where T : class, IStorageModel<TKey>
        {
            return Delete(typeof(T), id) as T;
        }

        public virtual object Delete(Type type, TKey id)
        {
            var item = Get(type, id);
            if (item != null)
            {
                Context.Remove(item);
                Context.SaveChanges();
            }
            return item;
        }

        public virtual T Get<T>(TKey id) where T : class, IStorageModel<TKey>
        {
            return Get(typeof(T), id) as T;
        }

        public virtual object Get(Type type, TKey id)
        {
            var set = GetDbSet(type);
            var setMethod = set.PropertyType.GetMethods().FirstOrDefault(x => x.Name == "Find");
            var item = setMethod.Invoke(set.GetValue(Context), new object[] { new object[] { id } });
            return item;
        }

        public virtual List<T> GetAll<T>() where T : class, IStorageModel<TKey>
        {
            var dbSetValue = GetAll(typeof(T));
            return dbSetValue.Cast<T>().ToList();
        }

        public virtual List<object> GetAll(Type type)
        {
            var dbSetValue = GetDbSet(type).GetValue(Context);
            var enumerable = (IEnumerable)dbSetValue;
            var result = enumerable.Cast<object>().ToList();
            return result;
        }

        public virtual List<T> Get<T>(IEnumerable<TKey> ids) where T : class, IStorageModel<TKey>
        {
            var dbSetValue = Get(typeof(T), ids);
            return dbSetValue.Cast<T>().ToList();
        }

        public virtual List<object> Get(Type type, IEnumerable<TKey> ids)
        {
            IEnumerable<object> result = null;
            if (ids != null)
            {
                result = new List<object>();
                foreach (TKey id in ids)
                {
                    object temp = Context.Find(type, id);
                    if (temp != null)
                    {
                        result.Append(temp);
                    }
                }
            }
            return result.ToList();
        }

        public virtual T Update<T>(TKey id, T newValue) where T : class, IStorageModel<TKey>
        {
            return Update(typeof(T), id, newValue) as T;
        }

        public virtual object Update(Type type, TKey id, object newValue)
        {
            var item = Get(type, id);
            if (item != null)
            {
                Context.Update(item);
                Context.SaveChanges();
            }
            return item;
        }

        private IEnumerable<PropertyInfo> _dbSets = null;

        private IEnumerable<PropertyInfo> DbSets => _dbSets ?? (_dbSets = Context.GetType()
                .GetProperties()/*.Where(prop => prop.PropertyType*/);

        private PropertyInfo GetDbSet(Type type)
        {
            Type currType = type;
            List<Type> types = new List<Type>();
            while (currType != null)
            {
                types.Add(currType);
                currType = currType.BaseType;
            }
            types.Reverse();
            bool goOn = true;
            PropertyInfo set = null;
            for (int i = 0; i < types.Count && goOn; i++)
            {
                set = DbSets.FirstOrDefault(x => x.PropertyType == typeof(DbSet<>).MakeGenericType(types[i]));
                if (set != null)
                {
                    goOn = false;
                }
            }
            return set;
        }


        public virtual int Count<T>() where T : class, IStorageModel<TKey>
        {
            return Count(typeof(T));
        }

        public virtual int Count(Type type)
        {
            return (GetDbSet(type).GetValue(Context) as IEnumerable<object>)?.Count() ?? 0;
        }

        public IEnumerable<Type> GetAllTypes()
        {
            return DbSets.Select(dbSet => dbSet.PropertyType.GetGenericArguments().FirstOrDefault()).Where(type => type != null);
        }

        public virtual IEnumerable<TKey> GetIds<T>(int? count = null) where T : class, IStorageModel<TKey>
        {
            return GetIds(typeof(T), count);
        }

        public virtual IEnumerable<TKey> GetIds(Type type, int? count = null)
        {
            IEnumerable<TKey> result = null;
            var dbSetValue = GetDbSet(type).GetValue(Context);
            var setEnum = (dbSetValue as IEnumerable).Cast<object>();
            if (count == null)
            {
                result = setEnum.Select((x) => (x as IStorageModel<TKey>).Id);
            }
            return result; 
        }

        public virtual IQueryable<T> GetAllQueryable<T>() where T : class, IStorageModel<TKey>
        {
            return GetAllQueryable(typeof(T)).Cast<T>();
        }

        public virtual IQueryable<object> GetAllQueryable(Type type)
        {
            var dbSetValue = GetDbSet(type).GetValue(Context);
            var queryable = (IQueryable)dbSetValue;
            return queryable.Cast<object>();
        }
    }
}
