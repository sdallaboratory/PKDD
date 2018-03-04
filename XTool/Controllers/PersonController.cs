using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using XTool.Data;
using XTool.Data.Storage;
using XTool.Models.DBModels;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace XTool.Controllers
{
    [Authorize]
    [Route("api/[controller]")]
    public class PersonController : Controller
    {
        private IStorage<int> _storage;

        public PersonController(IStorage<int> storage)
        {
            _storage = storage;
        }

        // GET: api/<controller>
        [HttpGet]
        public IEnumerable<Person> Get()
        {
            return new List<Person>();
        }

        // GET api/<controller>/5
        [HttpGet("{id}")]
        public Person Get(int id)
        {
            return new Person();
        }

        // POST api/<controller>
        [HttpPost]
        public void Post([FromBody]string value)
        {
        }

        // PUT api/<controller>/5
        [HttpPut("{id}")]
        public void Put(int id, [FromBody]string value)
        {
        }

        // DELETE api/<controller>/5
        [HttpDelete("{id}")]
        public void Delete(int id)
        {
        }
    }
}
