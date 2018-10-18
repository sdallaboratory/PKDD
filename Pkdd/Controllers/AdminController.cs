using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Pkdd.Controllers.Base;
using Pkdd.Models.Common;
using Pkdd.Models.Common.Enums;
using Pkdd.Models.Users;
using Pkdd.Users;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace Pkdd.Controllers
{
    [Route("api/admin")]
    [ApiController]
    [Authorize(Roles = "admin")]
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

        [HttpPost("{id}/role-actions")]
        public async Task<IActionResult> RoleActions([FromRoute] int id, [FromBody] RolesRequest request)
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
                    if (request.Action == RolesActions.Add)
                    {
                        await userManager.AddToRoleAsync(user, request.Role);
                    }
                    else
                    {
                        await userManager.RemoveFromRoleAsync(user, request.Role);
                    }
                    result = Ok();
                }
            }
            catch (Exception ex)
            {
                result = PkddError(ex.Message);
            }
            return result;
        }

        [HttpPost("{id}/ban")]
        public async Task<IActionResult> SetUserBanStatus([FromRoute] int id, [FromBody] BanRequest request)
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
                    if (request.Action == BanActions.Ban)
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
            catch (Exception ex)
            {
                result = PkddError(ex.Message);
            }
            return result;
        }

        [HttpPost("")]
        public async Task<JsonResult> CreateUser([FromBody] UserCreateInfo user)
        {
            try
            {
                PkddUser result = await userManager.CreateAsync(user.Email, user.Password, user.Name);
                await userManager.AddToRolesAsync(result, user.Roles);
                return PkddOk(await repository.GetAsync(user.Email));
            }
            catch (Exception e)
            {
                return PkddError(e.Message);
            }
        }

        [HttpPost("{id}/confirm")]
        public async Task<IActionResult> Confirm([FromRoute] int id)
        {
            try
            {
                PkddUser user = await userManager.FindAsync(id);
                if (user == null)
                {
                    return NotFound();
                }
                await userManager.ConfirmAsync(user);
                return Ok();
            }
            catch (Exception e)
            {
                return PkddError(e.Message);
            }
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> Delete([FromRoute] int id)
        {
            try
            {
                PkddUser user = await userManager.FindAsync(id);
                if (user == null)
                {
                    return NotFound();
                }
                await userManager.DeleteAsync(user);
                return Ok();
            }
            catch (Exception ex)
            {
                return PkddError(ex.Message);
            }
        }

    }
}
