using Microsoft.AspNetCore.Identity;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using XTool.Models.Roles;

namespace XTool.Controllers
{
    public class Authorization
    {
        private RoleManager<XToolRole> _roleManager;

        private UserManager<XToolUser> _userManager;

        public Authorization(RoleManager<XToolRole> roleManager, UserManager<XToolUser> userManager)
        {
            _roleManager = roleManager;
            _userManager = userManager;
            _roleManager;
            _userManager.
        }
    }
}
