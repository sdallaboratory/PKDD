using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Pkdd.Controllers.Base;
using Pkdd.Models.Common;
using Pkdd.Models.Person;
using Pkdd.Repositories;

namespace Pkdd.Controllers
{
    [Route("api/persons")]
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
            try
            {
                var persons = await _personRepository.GetAllPersons();
                return Ok(persons);
            }
            catch (Exception ex)
            {
                return StatusCode(500, new PkddResponse(isOk: false, message: ex.Message));
            }
        }

        [HttpGet]
        [Route("{id}")]
        public async Task<IActionResult> GetPerson([FromRoute] int id)
        {
            try
            {
                var person = await _personRepository.GetPerson(id);
                return Ok(person);
            }
            catch (Exception ex)
            {
                return StatusCode(500, new PkddResponse(isOk: false, message: ex.Message));
            }
        }

        [HttpGet]
        [Route("bio/{id}")]
        public async Task<IActionResult> GetMainBlock([FromRoute] int id)
        {
            try
            {
                var mainBlock = await _personRepository.GetMainBlock(id);
                return Ok(mainBlock);
            }
            catch (Exception ex)
            {
                return StatusCode(500, new PkddResponse(isOk: false, message: ex.Message));
            }
        }

        [HttpGet]
        [Route("bio/{id}/contents")]
        public async Task<IActionResult> GetContentBlock([FromRoute] int id)
        {
            try
            {
                var mainBlock = await _personRepository.GetContentBlock(id);
                return Ok(mainBlock);
            }
            catch (Exception ex)
            {
                return StatusCode(500, new PkddResponse(isOk: false, message: ex.Message));
            }
        }

        [HttpGet("contents")]
        public async Task<IActionResult> GetAllBlocks()
        {
            try
            {
                return PkddOk(await _personRepository.GetAllContentBlocks());
            }
            catch (Exception ex)
            {
                return PkddError(ex.Message);
            }
        }

        [HttpPost]
        [Route("")]
        public async Task<IActionResult> AddPerson([FromBody] Person person)
        {
            try
            {
                var newPerson = await _personRepository.AddPerson(person);
                return Ok(newPerson);
            }
            catch (Exception ex)
            {
                return StatusCode(500, new PkddResponse(isOk: false, message: ex.Message));
            }
        }

        [HttpPost]
        [Route("bio/{id}/contents/{parentId?}")]
        public async Task<IActionResult> AddContentBlock([FromBody] ContentBlock block, int id, int? parentId)
        {
            try
            {
                var newBlock = await _personRepository.AddContentBlock(id, block, parentId);
                return Ok(newBlock);
            }
            catch (Exception ex)
            {
                return StatusCode(500, new PkddResponse(isOk: false, message: ex.Message));
            }
        }

        [HttpPut]
        [Route("")]
        public async Task<IActionResult> UpdatePerson([FromBody] Person person)
        {
            try
            {
                await _personRepository.UpdatePerson(person);
                return Ok();
            }
            catch (Exception ex)
            {
                return StatusCode(500, new PkddResponse(isOk: false, message: ex.Message));
            }
        }

        [HttpPut]
        [Route("bio/{id}/contents")]
        public async Task<IActionResult> UpdateContentBlock([FromBody] ContentBlock block)
        {
            try
            {
                await _personRepository.UpdateContentBlock(block);
                return Ok();
            }
            catch (Exception ex)
            {
                return StatusCode(500, new PkddResponse(isOk: false, message: ex.Message));
            }
        }

        [HttpDelete]
        [Route("{id}")]
        public async Task<IActionResult> DeletePerson([FromRoute] int id)
        {
            try
            {
                await _personRepository.RemovePerson(id);
                return Ok();
            }
            catch (Exception ex)
            {
                return StatusCode(500, new PkddResponse(isOk: false, message: ex.Message));
            }
        }

        [HttpDelete]
        [Route("bio/{bioId}/contents/{id}")]
        public async Task<IActionResult> DeleteContentBlock([FromRoute] int id)
        {
            try
            {
                await _personRepository.RemoveContentBlock(id);
                return Ok();
            }
            catch (Exception ex)
            {
                return StatusCode(500, new PkddResponse(isOk: false, message: ex.Message));
            }
        }

    }
}