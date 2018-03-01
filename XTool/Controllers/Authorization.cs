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

namespace XTool.Controllers
{
    public class Authorization : Controller
    {
        private RoleManager<XToolRole> _roleManager;

        private UserManager<XToolUser> _userManager;

        private XToolDBContext _dBcontext; 

        public Authorization(RoleManager<XToolRole> roleManager, UserManager<XToolUser> userManager, XToolDBContext dBContext)
        {
            _roleManager = roleManager;
            _userManager = userManager;
            _dBcontext = dBContext;
        }

        [HttpGet]
        public IActionResult Login()
        {
            return View();
        }

        [HttpPost]
        [ValidateAntiForgeryToken]
        public async Task<IActionResult> Login(LoginModel login)
        {
            IActionResult result;
            if(ModelState.IsValid)
            {
                XToolUser user = _dBcontext.XToolUsers.FirstOrDefault( x => x.WithLogin(login));
                if(user != null)
                {
                    ClaimsPrincipal claim = new ClaimsPrincipal();
                    await HttpContext.SignInAsync(claim);
                    result = Redirect("~/Home/Index");
                }
                else
                {
                    result = Forbid();
                }
            }
            else
            {
                result = View();
            }
            return result;
        }
    }
}
