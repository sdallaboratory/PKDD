using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using XTool.Data.Storage;
using XTool.Data.ModelInterfaces;
using System.Reflection;
using XTool.Models.ModelInterfaces.DataAnnotations;
using XTool.Data.SearchEngine.SearchResult;
using System.Collections;
using XTool.Data.ModelInterfaces.DataAnnotations;

namespace XTool.Data.SearchEngine
{
    public abstract class SearchEngine<TOut, TKey> : ISearchEngine<TOut, TKey> where TOut : class, IStorageModel<TKey>
    {
        public IStorage<TKey> Storage { get; set; }

        protected PropertyInfo[] SearchableSimpleTypes { get; set; }

        protected PropertyInfo[] SearchableTypes { get; set; }

        public int ItemCount { get; }

        public SearchEngine(IStorage<TKey> storage)
        {
            Storage = storage;
            ItemCount = Storage.Count<TOut>();
        }

        protected void ProcessBaseType()
        {
            var props = typeof(TOut).GetProperties().Where(x => x.GetCustomAttribute(typeof(SearchEngineAttribute)) != null);
            SearchableSimpleTypes = props
                .Where(x => (x.GetCustomAttribute(typeof(SearchEngineAttribute)) as SearchEngineAttribute).SearchType == SearchType.Simple)
                .ToArray();
            SearchableTypes = props.ToArray();
        }

        protected SearchResult<TOut> ProcessProps(PropertyInfo[] property, TOut item, string request)
        {
            SearchResult<TOut> result = new SearchResult<TOut>(item);
            var attrs = property.ToDictionary(x => x, x => x.GetCustomAttribute(typeof(SearchEngineAttribute)) as SearchEngineAttribute);
            List<string> resultString = new List<string>();
            foreach (KeyValuePair<PropertyInfo, SearchEngineAttribute> pair in attrs)
            {
                if(pair.Value.Complexity == ComplexType.Simple)
                {
                    ProcessSimpleProp(pair, result, request, resultString);
                }
                else
                {
                    ProcessComplexProp(pair, result, request, resultString);
                }
                
            }
            result.FindedStrings = ProcessStr(resultString, request);
            return result;
        }

        protected SearchResult<TOut> ProcessSimpleProp(KeyValuePair<PropertyInfo, SearchEngineAttribute> pair, SearchResult<TOut> item, string request, List<string> resultString)
        {
            var attr = pair.Value;
            List<string> temp = new List<string>();
            object value;
            value = pair.Key.GetValue(item.Data);
            if (!(value is string) && value is IEnumerable)
            {
                var tempEnum = (value as IEnumerable).Cast<object>();
                temp.AddRange(tempEnum.Select(x => x.ToString()));
            }
            else
            {
                temp.Add(value.ToString());
            }
            var containsStr = temp.Select(x => x.Contains(request) ? x : null).Where(x => x != null);
            ToResult(item, attr, containsStr);
            resultString.AddRange(containsStr);
            return item;
        }

        protected SearchResult<TOut> ProcessComplexProp(KeyValuePair<PropertyInfo, SearchEngineAttribute> pair, SearchResult<TOut> item, string request, List<string> resultString)
        {
            return null;
        }

        protected string ProcessStr(List<string> strings, string request)
        {
            List<string> result = new List<string>(strings.Count);
            foreach(string str in strings)
            {
                int index = str.IndexOf(request);
                string temp = str.Substring(index + request.Length);
                var splits = temp.Split(' ');
                int normCount = Convert.ToInt32(Math.Ceiling((splits.Count() * (1.0 / 3.0))));
                temp = String.Join(" ", splits.Take(normCount).ToArray());
                if(index != 0)
                {
                    temp = "..." + temp;
                }
                temp = request + temp;
                if(temp.Length < str.Length)
                {
                    temp = temp + "...";
                }
                result.Add(temp);
            }
            return String.Join('\n', result);
        }

        protected void ToResult(SearchResult<TOut> result, SearchEngineAttribute attr, IEnumerable<string> containsStr)
        {
            if (containsStr.Count() > 0)
            {
                switch (attr.Importance)
                {
                    case SearchImportaceTypes.Neutral:
                        result.Neutral++;
                        break;
                    case SearchImportaceTypes.Important:
                        result.Imporatnt++;
                        break;
                    case SearchImportaceTypes.VeryImportant:
                        result.VeryImportant++;
                        break;
                }
            }
        }

        public abstract List<SearchResult<TOut>> FindItems(ISearchFilter filter);
    }
}
