using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Pkdd.Abstractions;
using Pkdd.Controllers.Base;
using Pkdd.Models.Auth;
using Pkdd.Models.Users;
using Pkdd.Users;
using System;
using System.Security.Claims;
using System.Threading.Tasks;

namespace Pkdd.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AuthController : PkddControllerBase
    {
        private readonly IPkddUserManager _users;
        private readonly IPkddAuthManager _auth;
        public AuthController(IPkddUserManager users, IPkddAuthManager auth)
        {
            _users = users;
            _auth = auth;
        }

        [HttpPost("sign-in")]
        public async Task<JsonResult> SignIn([FromBody] SignInModel model)
        {
            try
            {
                PkddUser user = await _auth.SignInAsync(model.Email, model.Password, model.Remember);
                return PkddOk(user, nameof(PkddUser)); 
            }
            catch (Exception e)
            {
                return PkddError(e.Message);
            }
        }

        [HttpPost("sign-out")]
        public async Task<JsonResult> SignOut([FromBody] SignOutModel model)
        {
            try
            {
                await _auth.SignOutAsync();
                return PkddOk();
            }
            catch(Exception e)
            {
                return PkddError(e.Message);
            }
        }
        
        [HttpPost("sign-up")]
        public async Task<JsonResult> SignUp([FromBody] SignUpModel model)
        {
            try
            {
                PkddUser user = await _users.CreateAsync(model.Email, model.Password, model.Name);
                return PkddOk(user, nameof(PkddUser));
            }
            catch (Exception e)
            {
                return PkddError(e.Message);
            }
        }

        [HttpPost("restore-password")]
        public async Task<JsonResult> RestorePassword([FromBody] RestorePasswordModel model)
        {
            return PkddError("Not implemented.");
        }

        [HttpGet("check")]
        public async Task<JsonResult> Check()
        {
            try
            {
                return PkddOk(await _auth.GetUserAsync());
            }
            catch (Exception e)
            {
                return PkddError(e.Message);
            }
        }
    }
}