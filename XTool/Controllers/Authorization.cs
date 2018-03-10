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

        private XToolDbContext _dbContext;

        public  Authorization(RoleManager<XToolRole> roleManager, UserManager<XToolUser> userManager, SignInManager<XToolUser> singInManager, XToolDbContext dBContext)
        {
            _roleManager = roleManager;
            _userManager = userManager;
            _dbContext = dBContext;
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
            if (findedUser.Result == null)
            {
                result = _userManager.CreateAsync(user, password);
                _userManager.AddToRolesAsync(findedUser.Result, new List<string>() { "superadmin", "admin" });
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
        public async Task<IActionResult> Login(LoginModel model)
        {
            IActionResult result = View();
            XToolUser user = await _userManager.FindByEmailAsync(model.Email);
            if (ModelState.IsValid && user != null && await _userManager.CheckPasswordAsync(user, model.Password))
            {

                if (user.IsConfirmed)
                {
                    var res = await _signInManager.PasswordSignInAsync(model.Email, model.Password, model.Remember, false);
                    if (res.Succeeded)
                    {
                        result = RedirectToAction("Actors", "Home");
                    }
                    else
                    {
                        // тут я ваще не знаю, что за ошибка произошла. Не должно такой быть вроде.
                    }
                }
                else
                {
                    ViewBag.Message = "Админстратор ещё не успел подтвердить ваш аккаунт. Подождите некоторое время.";
                    result = View("Message");
                }
            }
            return result;
        }

        //[Authorize(Roles = "admin")]
        [HttpGet]
        public IActionResult Register()
        {
            return View();
        }

        [HttpPost]
        public async Task<IActionResult> Register([FromForm] UserRegisterModel model)
        {
            IActionResult result = View();
            if (ModelState.IsValid)
            {
                XToolUser user = await _userManager.FindByEmailAsync(model.Email);
                if (user == null)
                {
                    user = new XToolUser() { Email = model.Email, UserName = model.Name };
                    var suc = await _userManager.CreateAsync(user);
                    if (suc.Succeeded)
                    {
                        user.PasswordHash = _userManager.PasswordHasher.HashPassword(user, model.Password);
                        await _userManager.UpdateAsync(user);
                        ViewBag.Message = $"Аккаунт {user.Email} успешно зарегистрирован. В ближайшее время администратор подтвердит ваш аккаунт и вы сможете войти в систему.";
                        result = View("Message");
                    }
                }
                else
                {
                    ModelState.AddModelError("", "Некорректные логин и(или) пароль");
                    ViewBag.Message = "Пользователь с таким Email уже зарегистрирован в системе.";
                }
            }
            else
            {
                ViewBag.Message = "Пользователь с таким Email уже зарегистрирован в системе.";
            }
            return result;
        }

        [HttpGet]
        public IActionResult Forgot()
        {
            return View();
        }

        [HttpPost]
        public IActionResult Forgot([FromForm] ForgotPasswordModel model)
        {
            ViewBag.Message = "Новый пароль отправлен вам на Email.";
            return View("Message");
        }

        [Authorize(Roles = "admin")]
        public IActionResult ConfirmUser(int id)
        {
            var user = _dbContext.Find<XToolUser>(id);
            var result = false;
            if (user != null & user.IsConfirmed == false)
            {
                user.IsConfirmed = true;
                result = true;
            }
            return Json(result);
        }

        public async Task<IActionResult> Logout()
        {
            await _signInManager.SignOutAsync();
            return RedirectToAction("Login");
        }
    }
}
