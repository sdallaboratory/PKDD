using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace XTool.Models.Roles
{
    public class TechnologistRole : XToolRole, IUpdateble
    { 
        public TechnologistRole(string roleName = "technologist") : base(roleName)
        {
        }

        public IUpdateble Update(IUpdateble model)
        {
            throw new NotImplementedException();
        }
    }
}
