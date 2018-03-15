using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace XTool.Models.Roles
{
    public class TechnologistRole : XToolRole, IUpdateble
    {
        public TechnologistRole() : this("technologist")
        {
        }

        public TechnologistRole(string roleName) : base(roleName)
        {
        }

        public new IUpdateble Update(IUpdateble model)
        {
            throw new NotImplementedException();
        }
    }
}
