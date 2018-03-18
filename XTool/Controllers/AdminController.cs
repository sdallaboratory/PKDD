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
        private readonly RoleManager<XToolRole> _roleManager;
        private readonly UserManager<XToolUser> _userManager;

        public AdminController(XToolDbContext context, UserManager<XToolUser> userManager, RoleManager<XToolRole> roleManager)
        {
            _userManager = userManager;
            _context = context;
            _roleManager = roleManager;
        }

        public async Task<IActionResult> Users()
        {
            ViewBag.Superadmins = await _userManager.GetUsersInRoleAsync("superadmin");
            ViewBag.Admins = await _userManager.GetUsersInRoleAsync("admin"); // Добавить Where Level < userLevel
            ViewBag.Experts = await _userManager.GetUsersInRoleAsync("expert");
            ViewBag.Technologists = await _userManager.GetUsersInRoleAsync("technologist");
            return View();
        }

        public async Task<IActionResult> CreateUser(UserRegisterModel model)
        {
            return Json(await _userManager.RegisterUserAsync(model));
        }

        public async Task<IActionResult> ConfirmUser(int id)
        {
            return Json(await _userManager.ConfirmUserAsync(_context.Find<XToolUser>(id)));
        }

        public async Task<IActionResult> BanUser(int id)
        {
            return Json(await _userManager.BanUserAsync(_context.Find<XToolUser>(id)));
        }

        public async Task<IActionResult> UnbanUser(int id)
        {
            return Json(await _userManager.UnbanUserAsync(_context.Find<XToolUser>(id)));
        }
    }
}
