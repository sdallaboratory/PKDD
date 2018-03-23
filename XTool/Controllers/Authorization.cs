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

using XTool.UserManager;
using XTool.Models.UserManager;

namespace XTool.Controllers
{
    public class Authorization : Controller
    {
        private static bool isSeeded;

        private RoleManager<XToolRole> _roleManager;

        private UserManager<XToolUser> _userManager;

        private SignInManager<XToolUser> _signInManager;

        private XToolDbContext _dbContext;

        public Authorization(XToolDbContext dBContext, RoleManager<XToolRole> roleManager, UserManager<XToolUser> userManager, SignInManager<XToolUser> singInManager)
        {
            _roleManager = roleManager;
            _userManager = userManager;
            _dbContext = dBContext;
            _signInManager = singInManager;
            if (!isSeeded)
            {
                Seed();
                isSeeded = true;
            }

        }

        private async void Seed()
        {
            //List<XToolRole> roles = new List<XToolRole>() { new SuperadminRole(), new AdminRole(), new TechnologistRole(), new ExpertRole() };
            //foreach (XToolRole role in roles)
            //    if (await _roleManager.FindByNameAsync(role.Name) == null)
            //        await _roleManager.CreateAsync(role);

            //UserRegisterModel model = new UserRegisterModel() { Email = "admin@email.io", Name = "Пётр Андреевич Вяземский", Password = "sys!admin2", PasswordRepeat = "sys!admin2", RoleName = "superadmin" };
            //await _userManager.RegisterUserAsync(model);
            //await _userManager.ConfirmUserAsync(await _userManager.FindByEmailAsync(model.Email));
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
            ViewBag.LoginModel = model;
            XToolUser user;
            if (!ModelState.IsValid)
                ViewBag.Message = "Введены некорректные данные!";
            else if ((user = await _userManager.FindByEmailAsync(model.Email)) == null)
                ViewBag.Message = "Пользователя с таким Email не существует!";
            else if (await _userManager.CheckPasswordAsync(user, model.Password) == false)
                ViewBag.Message = "Неверный пароль!";
            else
            {
                if (user.IsConfirmed)
                {
                    var res = await _signInManager.PasswordSignInAsync(user, model.Password, model.Remember, false);
                    if (res.Succeeded)
                    {
                        result = RedirectToAction("Actors", "Home");
                    }
                    else
                    {
                        ViewBag.Message = "Непредвиденная ошибка! Попробуйте войти ещё раз.";
                        // сюда мы не заглядываем.
                    }
                }
                else
                {
                    ViewBag.Message = "Админстратор ещё не успел подтвердить ваш аккаунт. Подождите некоторое время и повторите попытку.";
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
            if (model.RoleName == "technologist" || model.RoleName == "expert")
            {
                var operationResult = await _userManager.RegisterUserAsync(model);
                ViewBag.Message = operationResult.Message;
                if (operationResult.Status == Statuses.Ok)
                    result = View("Message");
            }
            else
                ViewBag.Message = "Невозможно зарегистрировать пользователя с такой ролью.";
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
            ViewBag.Message = "Сервис временно недоступен!";
            return View();
            //ViewBag.Message = "Новый пароль отправлен вам на Email.";
            //return View("Message");
        }

        //[Authorize(Roles = "admin")]
        //public IActionResult ConfirmUser(int id)
        //{
        //    var user = _dbContext.Find<XToolUser>(id);
        //    var result = false;
        //    if (user != null & user.IsConfirmed == false)
        //    {
        //        user.IsConfirmed = true;
        //        result = true;
        //    }
        //    return Json(result);
        //}

        public async Task<IActionResult> Logout()
        {
            await _signInManager.SignOutAsync();
            return RedirectToAction("Login");
        }
    }
}
