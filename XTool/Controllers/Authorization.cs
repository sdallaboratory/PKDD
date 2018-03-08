using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Identity;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using XTool.Models.Roles;

using Microsoft.EntityFrameworkCore;
using Microsoft.AspNetCore.Mvc;
using System.Security.Claims;

using Microsoft.AspNetCore.Authentication;
using Microsoft.AspNetCore.Authentication.Cookies;
using XTool.Models.TransferModels;
using XTool.Data;
using XTool.Data.Validations;
using Microsoft.AspNetCore.Authorization;
using XTool.Models;

namespace XTool.Controllers
{
    public class Authorization : Controller
    {
        private RoleManager<XToolRole> _roleManager;

        private UserManager<XToolUser> _userManager;

        private SignInManager<XToolUser> _signInManager;

        private XToolDbContext _dBcontext;

        public  Authorization(RoleManager<XToolRole> roleManager, UserManager<XToolUser> userManager, SignInManager<XToolUser> singInManager, XToolDbContext dBContext)
        {
            _roleManager = roleManager;
            _userManager = userManager;
            _dBcontext = dBContext;
            _signInManager = singInManager;
            var res = Seed();
        }

        private IdentityResult Seed()
        {
            Task<IdentityResult> result = null;
            var user = new XToolUser()
            {
                Email = "admin@email.io",
                UserName = "admin@email.io",
            };
            string password = "123AAAaaa!";
            var findedUser = _userManager.FindByEmailAsync(user.Email);
            findedUser.Wait();
            if ( findedUser.Result == null)
            {
                result =  _userManager.CreateAsync(user, password);
            }
            result?.Wait();
            return result?.Result;
        }

        [HttpGet]
        public IActionResult Login()
        {
            return View();
        }

        [HttpPost]
        //[ValidateAntiForgeryToken]
        public async Task<IActionResult> Login(LoginModel login)
        {
            IActionResult result;
            if(ModelState.IsValid)
            {
                var res = await _signInManager.PasswordSignInAsync(login.Email, login.Password, login.Remember, false);
                if(res.Succeeded)
                {
                    result = RedirectToAction("Actors", "Home");
                }
                else
                {
                    result = RedirectToAction("Login");
                }
            }
            else
            {
                result = View();
            }
            return result;
        }

        //[Authorize(Roles = "admin")]
        [HttpGet]
        public void Register()
        {
            View();
        }

        [HttpPost]
        public async Task<IActionResult> Register([FromForm] UserRegisterModel model)
        {
            if (ModelState.IsValid)
            {
                XToolUser user = await _dBcontext.Users.FirstOrDefaultAsync(u => u.Email == model.Email);
                if (user == null)
                {
                    var suc = await _userManager.CreateAsync(user);
                    if (suc.Succeeded)
                    {
                        return RedirectToAction("Index", "Home");
                    }
                }
                else
                    ModelState.AddModelError("", "Некорректные логин и(или) пароль");
            }
            return View(model);
        }

        public async Task<IActionResult> Logout()
        {
            await _signInManager.SignOutAsync();
            return RedirectToAction("Login", "Account");
        }
    }
}
