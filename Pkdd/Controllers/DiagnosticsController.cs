using Microsoft.AspNetCore.Mvc;
using Pkdd.Controllers.Base;
using Pkdd.Database;
using Pkdd.Models.Diagnostics;
using System.Threading.Tasks;

namespace Pkdd.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class DiagnosticsController : PkddControllerBase
    {
        private readonly DbSeeder _seeder;

        public DiagnosticsController(DbSeeder seeder)
        {
            _seeder = seeder;
        }

        [HttpGet("healthcheck")]
        public async Task<JsonResult> HealthCheck()
        {
            await _seeder.Seed();
            return PkddOk(new HealthCheckInfo(), "HealthCheckInfo");
        }
    }
}