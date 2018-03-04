using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Reflection;
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
            DeleteItemById(typeof(T), id);

            //var item = Context.Find<T>(typeof(T), id);
            //if (item != null)
            //{
            //    Context.Remove(item);
            //    Context.SaveChanges();
            //}
            //return item;
        }

        public virtual void DeleteItemById(Type type, TKey id) 
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

        public virtual IEnumerable<T> FindItems<T>() where T : class
        {
            return FindDBSet<T>().AsEnumerable();
        }

        public virtual T UpdateItem<T>(TKey id, Func<T, T, T> updater, T newValue) where T : class
        {
            T item = Context.Find<T>(id);
            if (item != null)
            {
                item = updater(item, newValue);
                Context.Update(item);
                Context.SaveChanges();
            }
            return item;
        }
        private DbSet<T> FindDBSet<T>() where T : class
        {
            var dbSet =  Context.GetType()
                .GetProperties()
                .Where( x => x.PropertyType == typeof(DbSet<T>))
                ?.FirstOrDefault()
                .GetValue(Context);
            return dbSet as DbSet<T>;       
        }
    }
}
