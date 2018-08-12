using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Pkdd.Controllers.Base;
using Pkdd.Models.Auth;
using Pkdd.Models.Users;
using Pkdd.Users;

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

        [HttpPost("signin")]
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

        [HttpPost("signout")]
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
        
        [HttpPost("signup")]
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

        [HttpPost("restorepassword")]
        public async Task<JsonResult> RestorePassword([FromBody] RestorePasswordModel model)
        {
            return PkddError("Not implemented.");
        }
    }
}