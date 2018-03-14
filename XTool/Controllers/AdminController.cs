using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using XTool.Data;
using XTool.Models.Roles;
using XTool.Models.TransferModels;
using XTool.UserManager;

namespace XTool.Controllers
{
    public class AdminController : Controller
    {
        private readonly XToolDbContext _context;
        private readonly UserManager<XToolUser> _userManager;

        public AdminController(XToolDbContext context, UserManager<XToolUser> userManager)
        {
            _userManager = userManager;
            _context = context;
        }

        public async Task<IActionResult> Users()
        {
            var asd = _context.Roles.Select(role => role.Name);
            var adms = await _userManager.GetUsersInRoleAsync("ADMIN");
            ViewBag.Admins = await _userManager.GetUsersInRoleAsync("ADMIN"); // Добавить Where Level < userLevel
            ViewBag.Experts = await _userManager.GetUsersInRoleAsync("EXPERT");
            ViewBag.Technologists = await _userManager.GetUsersInRoleAsync("TECHNOLOGIST");
            return View();
        }

        public async Task<IActionResult> CreateUser(UserRegisterModel model)
        {
            return Json(await _userManager.RegisterUserAsync(model));
        }

    }
}
