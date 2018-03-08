using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using XTool.Models.TransferModels;
using XTool.Models.TransferModels.TypesToEntityApi;
using Newtonsoft.Json;
using XTool.Data.Storage;
using XTool.Data.Validations;
using XTool.Data;
using XTool.Models;
using XTool.Models.ActorModels;
using Microsoft.EntityFrameworkCore;

namespace XTool.Controllers
{
    //[Authorize]
    [Route("api/entities")]
    public class EntitiesController : Controller
    {
        private XToolEntityStorage storage;

        private IValidator validator;

        private XToolDbContext cont;

        public EntitiesController(IStorage<int> storage, IValidator validator, XToolDbContext con)
        {
            this.storage = storage as XToolEntityStorage;
            this.validator = validator;
            cont = con;
        }

        [HttpGet("{typeName}")]
        public IActionResult Get(string typeName)
        {
            IActionResult result = NoContent();
            Type type = validator.IsInService(typeName);
            if (type != null)
            {
                result = Json(storage.GetAll(type));
            }
            return result;
        }

        [HttpGet]
        public IActionResult Get(string typeName, int id)
        {
            IActionResult result = NoContent();
            Type type = validator.IsInService(typeName);
            if (type != null)
            {
                result = Json(storage.Get(type, id));
            }
            return result;
        }


        // POST api/<controller>
        [HttpPost]
        public void Post([FromBody]RequestModel model)
        {
            Type type = validator.IsInService(model.Name);
            if (type != null)
            {
                var newItem = model.Body.ToObject(type);
                if(newItem != null )
                {
                    storage.Add(type, newItem);
                }
            }
        }

        // PUT api/<controller>/5
        [HttpPut("{id}")]
        public void Put([FromBody]RequestModel model)
        {
            Type type = validator.IsInService(model.Name);
            if (type != null)
            {
                object newItem = model.Body;
                if (newItem != null && model.Ids.Count > 0)
                {
                    var item = storage.Get(type, model.Ids.First());
                    (item as IUpdateble).Update(newItem as IUpdateble);
                    storage.Update(type, model.Ids.First(), item);
                }
            }
        }

        // DELETE api/<controller>/5
        [HttpDelete("{id}")]
        public void Delete(int id)
        {
        }

        [NonAction]
        private object TryToDeserialize(string content)
        {
            object result = null;
            try
            {
                result = JsonConvert.DeserializeObject(content);
            }
            catch (Exception)
            {
            }
            return result;            
        }
    }
}
