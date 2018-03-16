using System;
using System.Collections.Concurrent;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using XTool.Data.Storage;

namespace XTool.Data.StorageIterator
{
    public class StorageIterator<TKey, TOut> : IStorageIterator<TKey, TOut> where TOut : class
    {
        public IStorage<TKey> Storage { get; set; }

        private readonly Dictionary<int, TKey> idDictionary; 

        private int currentPosition = 0;

        private readonly int itemCount;

        public StorageIterator(IStorage<TKey> storage)
        {
            Storage = storage;
            IEnumerable<TKey> ids = storage.GetIds<TOut>();
            int i = 0;
            ids.ToDictionary((x) => i++, x => x);
            itemCount = Storage.Count<TOut>();
        }

        public bool RewindBackward(int count)
        {
            bool result = false;
            if((currentPosition - count) <= 0)
            {
                currentPosition += count;
                result = true;
            }
            return result;
        }

        public bool RewindForward(int count)
        {
            bool result = false;
            if ((currentPosition + count) <= itemCount)
            {
                currentPosition += count;
                result = true;
            }
            return result;
        }
        
        public List<TOut> TakeItemsForward(int count)
        {
            List<TOut> result = null;
            List<TKey> ids = new List<TKey>();
            for (int i = currentPosition; i < itemCount; i++)
            {
                try
                {
                    ids.Add(idDictionary[i]);
                }
                catch (KeyNotFoundException ex)
                {

                }
            }
            if (ids.Count != 0)
            {
                result = Storage.Get<TOut>(ids).ToList();
            }
            return result;
        }

        public List<TOut> TakeItemsBackward(int count)
        {
            List<TOut> result = null;
            List<TKey> ids = new List<TKey>();
            for (int i = currentPosition; i > 0; i--)
            {
                try
                {
                    ids.Add(idDictionary[i]);
                }
                catch(KeyNotFoundException ex)
                {

                }
            }
            if (ids.Count != 0)
            {
                result = Storage.Get<TOut>(ids).ToList();
            }
            return result;
        }
    }
}
