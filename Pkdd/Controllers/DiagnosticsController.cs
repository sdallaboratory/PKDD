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
            await _seeder.SeedAsync();
            return PkddOk(new HealthCheckInfo(), "HealthCheckInfo");
        }

        public async Task<string> Ping()
        {
            return "ok";
        }
    }
}