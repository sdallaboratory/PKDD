using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using XTool.Data.Storage;

namespace XTool.Data
{
    public abstract class EntityStorage<TKey> : IStorage<TKey>
    {
        public XToolDBContext Context { get; }

        public EntityStorage(XToolDBContext context)
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

        public T DeleteItemById<T>(TKey id) where T : class
        {

            var item = Context.Find<T>(typeof(T), id);
            if (item != null)
            {
                Context.Remove(item);
                Context.SaveChanges();
            }
            return item;
        }

        public T FindItemById<T>(TKey id) where T : class
        {
            return Context.Find<T>(typeof(T), id);
        }

        public IEnumerable<T> FindItems<T>() where T : class
        {
            return new List<T>();
        }

        public T UpdateItem<T>(TKey id, Func<T, T, T> updater, T newValue) where T : class
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
    }
}
