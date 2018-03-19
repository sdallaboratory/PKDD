using System;
using System.Collections.Generic;
using System.Linq;
using System.Reflection;
using System.Threading.Tasks;
using XTool.Data.SearchEngine.SearchResult;
using XTool.Data.Storage;
using XTool.Models.ActorModels;
using XTool.Models.ModelInterfaces.DataAnnotations;

namespace XTool.Data.SearchEngine
{
    public class ActorsSearchEngine : SearchEngine<Actor, int>
    {
        public ActorsSearchEngine(IStorage<int> storage) : base(storage)
        {
            ProcessBaseType();
        }

        public override List<SearchResult<Actor>> FindItems(ISearchFilter filter)
        {
            List<SearchResult<Actor>> result = null;
            IQueryable<SearchResult<Actor>> midResult = null;
            IEnumerable<PropertyInfo> props;
            if (filter != null && filter.SearchPropsNames != null && filter.IsAdvancedSearch)
            {
                props = SearchableTypes
                    .Where(type => filter.SearchPropsNames.Contains(type.Name));
            }
            else
            {
                props = SearchableSimpleTypes;
            }
            midResult = Search(filter.SearchString, props);
            result = TakeByPage(midResult, filter).ToList();
            return result;
        }

        private IQueryable<SearchResult<Actor>> Search(string searchString, IEnumerable<PropertyInfo> props)
        {
            return Storage.GetAllQueryable<Actor>()
                   .Select(actor => ProcessProps(props, actor, searchString))
                   .Where(res => res.Sum > 0)
                   .OrderByDescending(searchRes => searchRes.Result);             
        }


        private IQueryable<SearchResult<Actor>> TakeByPage(IQueryable<SearchResult<Actor>> midRes, ISearchFilter filter)
        {
            IQueryable<SearchResult<Actor>> result = midRes;
            int pages = Convert.ToInt32(Math.Ceiling((double)(ItemCount / filter.ElementOnPage)));
            int page = filter.Page;
            if (page > 0)
            {
                result = result.Skip((page - 1) * filter.ElementOnPage);
                if(pages != page)
                {
                    result = result.Take(filter.ElementOnPage);
                }
                else
                {
                    result = result.Take(ItemCount - filter.ElementOnPage*(page-1));
                }
            }
            return result;
        }
    }
}
