using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Pkdd.Controllers.Base;

namespace Pkdd.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class HealthCheckController : PkddControllerBase
    {
        [HttpGet("howareyou")]
        public JsonResult HowAreYou()
        {
            return PkddOk(new { Status = "Ok", Time = DateTime.Now }, "HealthCheckInfo");
        }
    }
}