using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Pkdd.Controllers.Base;
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

        public async Task<JsonResult> SignIn(string email, string password, bool remember)
        {
            return Json(null);
        }

        public async Task<JsonResult> SignOut(bool fromEverywhere = false)
        {
            try
            {
                await _auth.SignOutAsync();
            }
            catch(Exception e)
            {
                return PkddError(e.Message);
            }
            return Json(null);
        }

        public async Task<JsonResult> SignUp(string email, string password, string name)
        {
            try
            {
                PkddUser user = await _users.CreateAsync(email, password, name);
            }
            catch
            {

            }
            return Json(null);
        }

        public async Task<JsonResult> RestorePassword(string email)
        {
            return Json(null);
        }
    }
}