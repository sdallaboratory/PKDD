using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace XTool.Models.Roles
{
    public class AdminRole : XToolRole
    {
        public AdminRole(string roleName = "admin") : base(roleName)
        {
        }
    }
}
