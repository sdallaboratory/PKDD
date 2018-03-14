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
            Seed();

        }

        private async void Seed()
        {
            UserRegisterModel model = new UserRegisterModel() { Email = "admin@email.io", Name = "Пётр Андреевич Вяземский", Password = "sys!admin2", PasswordRepeat = "sys!admin2", RoleName = "ADMIN" };
            await _userManager.RegisterUserAsync(model);
            await _userManager.ConfirmUserAsync(await _userManager.FindByEmailAsync(model.Email));
            
            //var user = new XToolUser()
            //{
            //    Email = "admin@email.io",
            //    UserName = "Admin",
            //    IsConfirmed = true
            //};
            //string password = "AAAaaa123!";
            //XToolUser foundUser = await _userManager.FindByEmailAsync(user.Email);
            //if (foundUser == null)
            //{
            //    result = _userManager.CreateAsync(user, password);
            //    await _userManager.AddToRolesAsync(foundUser, new List<string>() { "superadmin", "admin" });
            //}
            //result?.Wait();
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
            XToolUser user ;
            if(!ModelState.IsValid)
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
            var operationResult = await _userManager.RegisterUserAsync(model);
            ViewBag.Message = operationResult.Message;
            if (operationResult.StatusCode == Statuses.Ok)
                result = View("Message");
            return result;

            //ViewBag.RegisterModel = model;
            //XToolUser foundUser = null;
            //if (!ModelState.IsValid)
            //    ViewBag.Message = "Введены некорректные данные!";
            //else if (model.Password != model.PasswordRepeat)
            //    ViewBag.Message = "Пароли не совпадают!";
            //else if ((foundUser = await _userManager.FindByEmailAsync(model.Email)) != null)
            //    ViewBag.Message = "Пользователем с таким Email уже зарегистрирован в системе!";
            //else
            //{
            //    var newUser = new XToolUser() { Email = model.Email, UserName = model.Name };
            //    var suc = await _userManager.CreateAsync(newUser);
            //    if (suc.Succeeded)
            //    {
            //        newUser.PasswordHash = _userManager.PasswordHasher.HashPassword(newUser, model.Password);
            //        await _userManager.UpdateAsync(newUser);
            //        ViewBag.Message = $"Аккаунт {newUser.Email} успешно зарегистрирован. В ближайшее время администратор подтвердит ваш аккаунт и вы сможете войти в систему.";
            //        result = View("Message");
            //    }
            //}
            //return result;
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
