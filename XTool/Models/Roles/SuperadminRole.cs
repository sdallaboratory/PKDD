using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using XTool.Data.ModelInterfaces;

namespace XTool.Models.Roles
{
    public class SuperadminRole : XToolRole, IStorageModel<int>
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
