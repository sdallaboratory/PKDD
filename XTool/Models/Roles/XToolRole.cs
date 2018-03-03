using Microsoft.AspNetCore.Identity;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace XTool.Models.Roles
{
    public abstract class XToolRole : IdentityRole<int>, IUpdateble
    {
        public XToolRole(string roleName) : base(roleName)
        {
        }

        public virtual IUpdateble Update(IUpdateble model)
        {
            throw new NotImplementedException();
        }
    }
}
