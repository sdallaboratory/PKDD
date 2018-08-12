using Microsoft.AspNetCore.Mvc;
using Pkdd.Controllers.Base;
using Pkdd.Models.Diagnostics;

namespace Pkdd.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class DiagnosticsController : PkddControllerBase
    {
        [HttpGet("healthcheck")]
        public JsonResult HealthCheck()
        {
            return PkddOk(new HealthCheckInfo(), "HealthCheckInfo");
        }
    }
}