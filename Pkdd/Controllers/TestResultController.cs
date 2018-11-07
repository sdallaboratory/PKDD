using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Pkdd.Controllers.Base;
using Pkdd.Database;
using Pkdd.Models.Results;
using Pkdd.Repositories;

namespace Pkdd.Controllers
{
    [Route("api/test-result")]
    [ApiController]
    [Authorize(Roles = "tech")]
    public class TestResultController : PkddControllerBase
    {
        private readonly IResultRepository _repo;

        public TestResultController(IResultRepository repo)
        {
            _repo = repo;
        }

        [HttpPost]
        public JsonResult AddOrUpdateResult(TestResult result)
        {
            try
            {
                TestResult storedResult = _repo.AddOrUpdateResult(result);
                return PkddOk(storedResult);
            }
            catch (Exception e)
            {
                return PkddError(e.Message);
            }
        }

        [HttpGet("{personId}")]
        public JsonResult GetResult([FromRoute] int personId)
        {
            try
            {
                IEnumerable<TestResult> results = _repo.GetPersonResults(personId);
                return PkddOk(results);
            }
            catch (Exception e)
            {
                return PkddError(e.Message);
            }
        }

        [HttpGet("{personId}/{userId}")]
        public JsonResult GetResult([FromRoute] int personId, [FromRoute] int userId)
        {
            try
            {
                TestResult result = _repo.GetResult(personId, userId) ?? throw new Exception("Этот эксперт ещё не оценил эту персону.");
                return PkddOk(result);
            }
            catch (Exception e)
            {
                return PkddError(e.Message);
            }
        }
    }
}