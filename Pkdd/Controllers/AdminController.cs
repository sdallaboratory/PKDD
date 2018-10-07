using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Pkdd.Controllers.Base;
using Pkdd.Models.Users;
using Pkdd.Users;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace Pkdd.Controllers
{
    [Route("api/admin")]
    public class AdminController : PkddControllerBase
    {
        private readonly IPkddUserRepository repository;
        private readonly IPkddUserManager userManager;

        public AdminController(IPkddUserRepository repository, IPkddUserManager manager)
        {
            this.repository = repository;
            userManager = manager;
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

        [HttpPost("{id}/role-actions/{role}/{flag}")]
        public async Task<IActionResult> RoleActions([FromRoute] int id, [FromRoute] bool flag, [FromRoute] string role)
        {
            IActionResult result = null;
            try
            {
                PkddUser user = await userManager.FindAsync(id);
                if (user == null)
                {
                    result = NotFound();
                }
                else
                {
                    if (flag)
                    {
                        await userManager.AddToRoleAsync(user, role);
                    }
                    else
                    {
                        await userManager.RemoveFromRoleAsync(user, role);
                    }
                    result = Ok();
                }
            }
            catch
            {
                result = StatusCode(500);
            }
            return result;
        }

        [HttpPost("{id}/ban/{flag}")]
        public async Task<IActionResult> BanOrUnbanUser([FromRoute] int id, [FromRoute] bool flag)
        {
            IActionResult result = null;
            try
            {
                PkddUser user = await userManager.FindAsync(id);
                if (user == null)
                {
                    result = NotFound();
                }
                else
                {
                    if (flag)
                    {
                        await userManager.BanAsync(user);
                    }
                    else
                    {
                        await userManager.UnbanAsync(user);
                    }
                    result = Ok();
                }
            }
            catch
            {
                result = StatusCode(500);
            }
            return result;
        }

    }
}
