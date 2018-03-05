using Microsoft.EntityFrameworkCore;
using System;
using System.Collections;
using System.Collections.Generic;
using System.Linq;
using System.Reflection;
using System.Reflection.Emit;
using System.Threading.Tasks;
using XTool.Data.Storage;

namespace XTool.Data
{
    public abstract class EntityStorage<TKey> : IStorage<TKey>
    {
        public DbContext Context { get; }

        public EntityStorage(DbContext context)
        {
            Context = context;
        }

        public virtual TKey AddItem<T>(T item) where T : class
        {
            return AddItem(typeof(T), item);
        }

        public virtual TKey AddItem(Type type, object item)
        {
            TKey result = default(TKey);
            if (item != null)
            {
                var temp = Context.Add(item);
                Context.SaveChanges();
                result = temp.GetDatabaseValues().GetValue<TKey>("Id");
            }
            return result;
        }

        public virtual T DeleteItemById<T>(TKey id) where T : class
        {
            return DeleteItemById(typeof(T), id) as T;
        }

        public virtual object DeleteItemById(Type type, TKey id) 
        {
            var item = Context.Find(type, id);
            if (item != null)
            {
                Context.Remove(item);
                Context.SaveChanges();
            }
            return item;
        }

        public virtual T FindItemById<T>(TKey id) where T : class
        {
            return Context.Find<T>(typeof(T), id);
        }

        public virtual object FindItemById(Type type, TKey id)
        {
            return Context.Find(type, id);
        }

        public virtual IEnumerable<T> FindItems<T>() where T : class
        {
            var dbSetValue = FindItems(typeof(T));
            return dbSetValue.Cast<T>().ToList();
        }

        public virtual IEnumerable<object> FindItems(Type type)
        {
            var dbSet = Context.GetType()
                .GetProperties()
                .Where(x => x.PropertyType == typeof(DbSet<>).MakeGenericType(type))
               ?.FirstOrDefault()
               .GetValue(Context);
            var enumerable = (IEnumerable)dbSet;
            var result = enumerable.Cast<object>().ToList();
            return result;
        }

        public virtual IEnumerable<T> FindItems<T>(IEnumerable<TKey> ids) where T : class
        {
            var dbSetValue = FindItems(typeof(T), ids);
            return dbSetValue.Cast<T>().ToList();
        }

        public virtual IEnumerable<object> FindItems(Type type, IEnumerable<TKey> ids)
        {
            IEnumerable<object> result = null;
            if (ids != null)
            {
                result = new List<object>();
                foreach (TKey id in ids)
                {
                    object temp = Context.Find(type, id);
                    if(temp != null)
                    {
                        result.Append(temp);
                    }
                }
            }
            return result;
        }

        public virtual T UpdateItem<T>(TKey id, T newValue) where T : class
        {
            T item = Context.Find<T>(id);
            if (item != null)
            {
                Context.Update(item);
                Context.SaveChanges();
            }
            return item;
        }

        public virtual object UpdateItem(Type type, TKey id, object newValue)
        {
            object item = Context.Find(type, id);
            if (item != null)
            {
                Context.Update(item);
                Context.SaveChanges();
            }
            return item;
        }

    }
}
