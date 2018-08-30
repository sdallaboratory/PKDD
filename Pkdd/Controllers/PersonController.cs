using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Pkdd.Controllers.Base;
using Pkdd.Repositories;

namespace Pkdd.Controllers
{
    [Route("api/persons")]
    [ApiController]
    public class PersonController : PkddControllerBase
    {
        private readonly IPersonRepository _personRepository;

        public PersonController(IPersonRepository repository)
        {
            _personRepository = repository;
        }

        [HttpGet]
        [Route("")]
        public async Task<IActionResult> GetPersons()
        {
            return Ok(await _personRepository.GetAllPersons());
        }
    }
}