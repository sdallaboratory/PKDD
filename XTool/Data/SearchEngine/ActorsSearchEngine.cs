using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using XTool.Data.Storage;
using XTool.Models.ActorModels;

namespace XTool.Data.SearchEngine
{
    public class ActorsSearchEngine : SearchEngine<Actor, int>
    {
        public ActorsSearchEngine(IStorage<int> storage) : base(storage)
        {
            ProcessBaseType();
        }

        public override List<Actor> FindItems(ISearchFilter filter)
        {
            List<Actor> result = null;
            IQueryable<Actor> midResult = null;
            if(filter.IsAdvancedSearch)
            {

            }
            else
            {
                midResult = SimpleSearch(filter.SearchString);
                result = TakeByPage(midResult, filter).ToList();
            }

            return result;
        }

        private IQueryable<Actor> SimpleSearch(string searchString)
        {
            return Storage.GetAllQueryable<Actor>().
                Where( actor => SearchableSimpleTypes.
                        Select(actorProp => actorProp.GetValue(actor).ToString().Contains(searchString)).Any(isSub => isSub));
        }

        private IQueryable<Actor> TakeByPage(IQueryable<Actor> midRes, ISearchFilter filter)
        {
            IQueryable<Actor> result = midRes;
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
