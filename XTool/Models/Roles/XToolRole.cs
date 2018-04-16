using Microsoft.AspNetCore.Identity;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using XTool.Data.ModelInterfaces;

namespace XTool.Models.Roles
{
    public abstract class XToolRole : IdentityRole<int>, IStorageModel<int>
    {
        public XToolRole(string roleName) : base(roleName)
        {
        }

        public IUpdateble Update(IUpdateble model)
        {
            throw new NotImplementedException();
        }
    }
}
