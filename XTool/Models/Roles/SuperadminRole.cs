using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace XTool.Models.Roles
{
    public class SuperadminRole : XToolRole, IUpdateble
    {
        public SuperadminRole() : this("superadmin")
        {
        }

        public SuperadminRole(string roleName) : base(roleName)
        {
        }

        public new IUpdateble Update(IUpdateble model)
        {
            throw new NotImplementedException();
        }
    }
}
