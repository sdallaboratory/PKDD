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
                var set = GetDBSet(type);
                var setMethod = set.PropertyType.GetMethods().FirstOrDefault(x => x.Name == "Add");
                Convert.ChangeType(item, type);
                var a = setMethod.Invoke(set.GetValue(Context), new object[] {item}); 
                Context.SaveChanges();
            }
            return result;
        }

        public virtual T DeleteItemById<T>(TKey id) where T : class
        {
            return DeleteItemById(typeof(T), id) as T;
        }

        public virtual object DeleteItemById(Type type, TKey id) 
        {
            var item = FindItemById(type, id);
            if (item != null)
            {
                Context.Remove(item);
                Context.SaveChanges();
            }
            return item;
        }

        public virtual T FindItemById<T>(TKey id) where T : class
        {
            return FindItemById(typeof(T), id) as T;
        }

        public virtual object FindItemById(Type type, TKey id)
        {
            var set = GetDBSet(type);
            var setMethod = set.PropertyType.GetMethods().FirstOrDefault(x => x.Name == "Find");
            var item = setMethod.Invoke(set.GetValue(Context), new object[] { id });
            return item;
        }

        public virtual IEnumerable<T> FindItems<T>() where T : class
        {
            var dbSetValue = FindItems(typeof(T));
            return dbSetValue.Cast<T>().ToList();
        }

        public virtual IEnumerable<object> FindItems(Type type)
        {
            var dbSetValue = Context.GetType()
                .GetProperties()
                .Where(x => x.PropertyType.Name == typeof(DbSet<>).MakeGenericType(type).Name)
               ?.FirstOrDefault()
               .GetValue(Context);
            var enumerable = (IEnumerable)dbSetValue;
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
            return UpdateItem(typeof(T), id, newValue) as T;
        }

        public virtual object UpdateItem(Type type, TKey id, object newValue)
        {
            var item = FindItemById(type, id);
            if (item != null)
            {
                Context.Update(item);
                Context.SaveChanges();
            }
            return item;
        }

        public PropertyInfo GetDBSet(Type type)
        {
            var dbSets = Context.GetType()
                .GetProperties();
            Type currType = type;
            List<Type> types = new List<Type>();
            while (currType != null)
            {
                types.Add(currType);
                currType = currType.BaseType;
            }
            types.Reverse();
            bool goOn = true;
            PropertyInfo set = null ;
            for(int i = 0; i < types.Count && goOn; i++)
            {
                set = dbSets.FirstOrDefault(x => x.PropertyType == typeof(DbSet<>).MakeGenericType(types[i]));
                if (set != null)
                {
                    goOn = false;
                }
            }
            return set;
        }

    }
}
