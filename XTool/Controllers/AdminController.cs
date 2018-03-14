using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using XTool.Data;
using XTool.Models.Roles;

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
            ViewBag.Admins = (await _userManager.GetUsersInRoleAsync("admin")); // Добавить Where Level < userLevel
            ViewBag.Experts = await _userManager.GetUsersInRoleAsync("expert");
            ViewBag.Technologists = await _userManager.GetUsersInRoleAsync("technologist");
            return View();
        }

        public async Task<IActionResult> CreateUser(XToolUser user)
        {
            return null;
        }

    }
}
