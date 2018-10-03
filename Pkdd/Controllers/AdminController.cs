using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Pkdd.Controllers.Base;
using Pkdd.Users;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace Pkdd.Controllers
{
    [Route("api/[controller]")]
    public class AdminController : PkddControllerBase
    {
        private readonly IPkddUserRepository repository;

        public AdminController(IPkddUserRepository repository)
        {
            this.repository = repository;
        }

        [HttpGet("")]
        public async Task<JsonResult> GetUsers()
        {
            try
            {
                return PkddOk(await repository.GetAllAsync());
            }
            catch (Exception e)
            {
                return PkddError(e.Message);
            }
        }
    }
}
