using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace XTool.Models.Roles
{
    public class SuperadminRole : XToolRole, IUpdateble
    {
        public SuperadminRole(string roleName = "superadmin") : base(roleName)
        {
        }
    }
}
