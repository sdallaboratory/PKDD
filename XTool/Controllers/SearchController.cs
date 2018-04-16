using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using XTool.Data.SearchEngine;
using XTool.Models.ActorModels;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace XTool.Controllers
{
    [Route("api/[controller]")]
    public class SearchController : Controller
    {
        private ActorsSearchEngine engine;
            
        public SearchController(ISearchEngine<Actor, int> engine)
        {
            this.engine = engine as ActorsSearchEngine;
        }

        [HttpPost]
        public IActionResult Get([FromBody] SearchFilter filter)
        {
            var item = engine.FindItems(filter);
            return Json(item.Select(x => new { x.Data, x.FindedStrings }));
        }
    }
}
