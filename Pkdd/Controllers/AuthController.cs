using Microsoft.AspNetCore.Mvc;
using Pkdd.Controllers.Base;
using Pkdd.Models.Auth;
using Pkdd.Models.Users;
using Pkdd.Users;
using System;
using System.Threading.Tasks;

namespace Pkdd.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AuthController : PkddControllerBase
    {
        private readonly IPkddUserManager users;
        private readonly IPkddAuthManager auth;
        private readonly IPkddUserRepository repository;

        public AuthController(IPkddUserManager users, IPkddAuthManager auth, IPkddUserRepository repository)
        {
            this.users = users;
            this.auth = auth;
            this.repository = repository;
        }

        [HttpPost("sign-in")]
        public async Task<JsonResult> SignIn([FromBody] SignInModel model)
        {
            try
            {
                PkddUser user = await auth.SignInAsync(model.Email, model.Password, model.Remember);
                PkddUserInfo userInfo = await repository.GetAsync(user.Id);
                return PkddOk(userInfo);
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
                await auth.SignOutAsync();
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
                PkddUser user = await users.CreateAsync(model.Email, model.Password, model.Name);
                await users.AddToRoleAsync(user, "expert");
                await users.AddToRoleAsync(user, "admin");
                PkddUserInfo userInfo = await repository.GetAsync(user.Id);
                return PkddOk(userInfo);
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

        [HttpGet("get-user")]
        public async Task<JsonResult> GetUser()
        {
            try
            {
                PkddUser user = await auth.GetUserAsync();
                PkddUserInfo userInfo = await repository.GetAsync(user.Id);
                return PkddOk(userInfo);

            }
            catch (Exception e)
            {
                return PkddError("Вы не авторизованы.");
            }
        }
    }
}